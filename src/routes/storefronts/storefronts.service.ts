import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Storefront } from './storefront.entity';
import { Product } from '../products/product.entity';

interface CreateStorefrontDto {
  title: string;
  description?: string;
}

interface UpdateStorefrontDto {
  title?: string;
  description?: string;
}

@Injectable()
export class StorefrontsService {
  constructor(
    @InjectRepository(Storefront)
    private readonly storefrontRepo: Repository<Storefront>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(ownerId: number, data: CreateStorefrontDto) {
    const storefront = this.storefrontRepo.create({
      title: data.title,
      description: data.description,
      owner: { id: ownerId } as any,
    });
    return this.storefrontRepo.save(storefront);
  }

  findAll() {
    return this.storefrontRepo.find({
      relations: ['owner'],
    });
  }

  async findOne(id: number) {
    const storefront = await this.storefrontRepo.findOne({
      where: { id },
      relations: ['owner', 'products'],
    });
    if (!storefront) throw new NotFoundException('Storefront not found');
    return storefront;
  }

  findMine(ownerId: number) {
    return this.storefrontRepo.find({
      where: { owner: { id: ownerId } },
      relations: ['owner'],
    });
  }

  async update(id: number, ownerId: number, data: UpdateStorefrontDto) {
    const storefront = await this.findOne(id);
    if (storefront.owner.id !== ownerId) {
      throw new ForbiddenException('You do not own this storefront');
    }

    Object.assign(storefront, data);
    return this.storefrontRepo.save(storefront);
  }

  async remove(id: number, ownerId: number) {
    const storefront = await this.findOne(id);
    if (storefront.owner.id !== ownerId) {
      throw new ForbiddenException('You do not own this storefront');
    }

    await this.storefrontRepo.remove(storefront);
    return { success: true };
  }

  async getProducts(id: number) {
    const storefront = await this.findOne(id);
    return storefront.products ?? [];
  }

  async addProducts(id: number, ownerId: number, productIds: number[]) {
    const storefront = await this.findOne(id);
    if (storefront.owner.id !== ownerId) {
      throw new ForbiddenException('You do not own this storefront');
    }

    const products = await this.productRepo.find({
      where: { id: In(productIds) },
    });

    storefront.products = [...(storefront.products ?? []), ...products];

    await this.storefrontRepo.save(storefront);
    return storefront;
  }

  async removeProduct(id: number, ownerId: number, productId: number) {
    const storefront = await this.findOne(id);
    if (storefront.owner.id !== ownerId) {
      throw new ForbiddenException('You do not own this storefront');
    }

    storefront.products =
      (storefront.products ?? []).filter((p) => p.id !== productId);

    await this.storefrontRepo.save(storefront);
    return storefront;
  }
}
