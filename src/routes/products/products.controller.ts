import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.createProduct(body);
  }

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productsService.findProductById(Number(id));
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.updateProduct(Number(id), body);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.removeProduct(Number(id));
  }

  // ---- Variants ----

  @Get(':productId/variants')
  listVariants(@Param('productId') productId: string) {
    return this.productsService.listVariants(Number(productId));
  }

  @Post(':productId/variants')
  createVariant(
    @Param('productId') productId: string,
    @Body() body: CreateVariantDto,
  ) {
    return this.productsService.createVariant(Number(productId), body);
  }

  @Patch(':productId/variants/:variantId')
  updateVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body() body: UpdateVariantDto,
  ) {
    return this.productsService.updateVariant(
      Number(productId),
      Number(variantId),
      body,
    );
  }

  @Delete(':productId/variants/:variantId')
  removeVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ) {
    return this.productsService.removeVariant(
      Number(productId),
      Number(variantId),
    );
  }
}
