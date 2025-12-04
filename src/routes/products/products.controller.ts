import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Req() req, @Body() body: CreateProductDto) {
    return this.productsService.createProduct(req.user.userId, body);
  }

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMyProducts(@Req() req) {
    return this.productsService.findByOwner(req.user.userId);
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productsService.findProductById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Req() req,
    @Body() body: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(Number(id), req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeProduct(@Param('id') id: string, @Req() req) {
    return this.productsService.removeProduct(Number(id), req.user.userId);
  }

  // ---- Variants ----

  @Get(':productId/variants')
  listVariants(@Param('productId') productId: string) {
    return this.productsService.listVariants(Number(productId));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':productId/variants')
  createVariant(
    @Param('productId') productId: string,
    @Req() req,
    @Body() body: CreateVariantDto,
  ) {
    return this.productsService.createVariant(Number(productId), req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':productId/variants/:variantId')
  updateVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Req() req,
    @Body() body: UpdateVariantDto,
  ) {
    return this.productsService.updateVariant(
      Number(productId),
      Number(variantId),
      req.user.userId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productId/variants/:variantId')
  removeVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Req() req,
  ) {
    return this.productsService.removeVariant(
      Number(productId),
      Number(variantId),
      req.user.userId,
    );
  }

  // ---- Owner Management ----

  @UseGuards(JwtAuthGuard)
  @Post(':id/owners')
  addOwner(
    @Param('id') id: string,
    @Req() req,
    @Body() body: { userId: number },
  ) {
    return this.productsService.addOwner(
      Number(id),
      req.user.userId,
      body.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/owners/:userId')
  removeOwner(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Req() req,
  ) {
    return this.productsService.removeOwner(
      Number(id),
      req.user.userId,
      Number(userId),
    );
  }
}
