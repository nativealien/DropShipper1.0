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

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(
    @Body()
    body: {
      provider: string;
      pid?: string;
      sku?: string;
      name: string;
      description?: string;
      imageUrl?: string;
      imageSet?: any;
      variants?: {
        vid?: string;
        sku?: string;
        name?: string;
        key?: string;
        standard?: string;
        length?: number;
        width?: number;
        height?: number;
        weight?: number;
        image_url?: string;
        buy_price?: number;
        suggested_price?: number;
        margin_percent?: number;
        sell_price?: number;
      }[];
      storefrontIds?: number[];
    },
  ) {
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
  updateProduct(
    @Param('id') id: string,
    @Body()
    body: {
      provider?: string;
      pid?: string;
      sku?: string;
      name?: string;
      description?: string;
      imageUrl?: string;
      imageSet?: any;
    },
  ) {
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
    @Body()
    body: {
      vid?: string;
      sku?: string;
      name?: string;
      key?: string;
      standard?: string;
      length?: number;
      width?: number;
      height?: number;
      weight?: number;
      image_url?: string;
      buy_price?: number;
      suggested_price?: number;
      margin_percent?: number;
      sell_price?: number;
    },
  ) {
    return this.productsService.createVariant(Number(productId), body);
  }

  @Patch(':productId/variants/:variantId')
  updateVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body()
    body: {
      vid?: string;
      sku?: string;
      name?: string;
      key?: string;
      standard?: string;
      length?: number;
      width?: number;
      height?: number;
      weight?: number;
      image_url?: string;
      buy_price?: number;
      suggested_price?: number;
      margin_percent?: number;
      sell_price?: number;
    },
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
