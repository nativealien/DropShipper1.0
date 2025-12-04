import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './product.entity';
import { Variant } from './variant.entity';
import { Storefront } from '../storefronts/storefront.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,
    @InjectRepository(Storefront)
    private readonly storefrontRepo: Repository<Storefront>,
  ) {}

  private async ensureUniqueProductIdentifiers(
    pid?: string,
    sku?: string,
    ignoreId?: number,
  ) {
    const where: any[] = [];
    if (pid) where.push({ pid });
    if (sku) where.push({ sku });

    if (where.length === 0) return;

    const existing = await this.productRepo.find({
      where,
    });

    const conflict = existing.find((p) => p.id !== ignoreId);
    if (conflict) {
      throw new BadRequestException(
        'A product with the same pid or sku already exists',
      );
    }
  }

  private async ensureUniqueVariantIdentifiersForCreate(
    variants: CreateVariantDto[],
  ) {
    // Check duplicates within the payload
    const seenPid = new Set<string>();
    const seenSku = new Set<string>();

    for (const v of variants) {
      if (v.vid) {
        if (seenPid.has(v.vid)) {
          throw new BadRequestException(
            `Duplicate vid "${v.vid}" in variants payload`,
          );
        }
        seenPid.add(v.vid);
      }
      if (v.sku) {
        if (seenSku.has(v.sku)) {
          throw new BadRequestException(
            `Duplicate sku "${v.sku}" in variants payload`,
          );
        }
        seenSku.add(v.sku);
      }
    }

    // Check against DB
    const pids = variants.map((v) => v.vid).filter(Boolean) as string[];
    const skus = variants.map((v) => v.sku).filter(Boolean) as string[];

    if (pids.length === 0 && skus.length === 0) return;

    const where: any[] = [];
    if (pids.length > 0) where.push({ vid: In(pids) });
    if (skus.length > 0) where.push({ sku: In(skus) });

    const existing = await this.variantRepo.find({ where });
    if (existing.length > 0) {
      throw new BadRequestException(
        'One or more variants with the same vid or sku already exist',
      );
    }
  }

  private async ensureUniqueVariantIdentifiersForUpdate(
    variantId: number,
    data: UpdateVariantDto,
  ) {
    const where: any[] = [];
    const maybeVid = (data as any).vid as string | undefined;
    const maybeSku = (data as any).sku as string | undefined;

    if (maybeVid) where.push({ vid: maybeVid });
    if (maybeSku) where.push({ sku: maybeSku });
    if (where.length === 0) return;

    const existing = await this.variantRepo.find({ where });
    const conflict = existing.find((v) => v.id !== variantId);
    if (conflict) {
      throw new BadRequestException(
        'A variant with the same vid or sku already exists',
      );
    }
  }

  async createProduct(data: CreateProductDto) {
    const { variants, storefrontIds, ...productData } = data;

    await this.ensureUniqueProductIdentifiers(productData.pid, productData.sku);


    const product = this.productRepo.create(productData);

    if (storefrontIds && storefrontIds.length > 0) {
      const storefronts = await this.storefrontRepo.find({
        where: { id: In(storefrontIds) },
      });
      product.storefronts = storefronts;
    }

    await this.productRepo.save(product);

    if (variants && variants.length > 0) {
      await this.ensureUniqueVariantIdentifiersForCreate(variants);

      const variantEntities = variants.map((v) =>
        this.variantRepo.create({
          ...v,
          product,
        }),
      );
      await this.variantRepo.save(variantEntities);
    }

    // Return product with variants populated
    return this.findProductById(product.id);
  }

  findAllProducts() {
    return this.productRepo.find({ relations: ['variants'] });
  }

  async findProductById(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['variants'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const product = await this.findProductById(id);

    // If pid or sku are changing, enforce uniqueness
    if (data.pid || data.sku) {
      await this.ensureUniqueProductIdentifiers(data.pid, data.sku, id);
    }

    Object.assign(product, data);
    return this.productRepo.save(product);
  }

  async removeProduct(id: number) {
    const product = await this.findProductById(id);
    
    // Explicitly delete all variants first (CASCADE should handle this, but being explicit)
    if (product.variants && product.variants.length > 0) {
      await this.variantRepo.remove(product.variants);
    }
    
    // Then delete the product
    await this.productRepo.remove(product);
    return { success: true };
  }

  async listVariants(productId: number) {
    const product = await this.findProductById(productId);
    return product.variants ?? [];
  }

  async createVariant(productId: number, data: CreateVariantDto) {
    const product = await this.findProductById(productId);

    await this.ensureUniqueVariantIdentifiersForCreate([data]);

    const variant = this.variantRepo.create({
      ...data,
      product,
    });

    return this.variantRepo.save(variant);
  }

  async updateVariant(productId: number, variantId: number, data: UpdateVariantDto) {
    await this.findProductById(productId);

    const variant = await this.variantRepo.findOne({
      where: { id: variantId },
      relations: ['product'],
    });
    if (!variant || variant.product.id !== productId) {
      throw new NotFoundException('Variant not found for this product');
    }

    await this.ensureUniqueVariantIdentifiersForUpdate(variantId, data);

    Object.assign(variant, data);
    return this.variantRepo.save(variant);
  }

  async removeVariant(productId: number, variantId: number) {
    await this.findProductById(productId);

    const variant = await this.variantRepo.findOne({
      where: { id: variantId },
      relations: ['product'],
    });
    if (!variant || variant.product.id !== productId) {
      throw new NotFoundException('Variant not found for this product');
    }

    await this.variantRepo.remove(variant);
    return { success: true };
  }
}
