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
import { StorefrontsService } from './storefronts.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../users/role.enum';
import { CreateStorefrontDto } from './dto/create-storefront.dto';
import { UpdateStorefrontDto } from './dto/update-storefront.dto';
import { AddProductsDto } from './dto/add-products.dto';

@Controller('storefronts')
export class StorefrontsController {
  constructor(private readonly storefrontsService: StorefrontsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Body() body: CreateStorefrontDto,
  ) {
    return this.storefrontsService.create(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.storefrontsService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMine(@Req() req) {
    return this.storefrontsService.findMine(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storefrontsService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() body: UpdateStorefrontDto,
  ) {
    return this.storefrontsService.update(
      Number(id),
      req.user.userId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.storefrontsService.remove(Number(id), req.user.userId);
  }

  @Get(':id/products')
  getProducts(@Param('id') id: string) {
    return this.storefrontsService.getProducts(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/products')
  addProducts(
    @Param('id') id: string,
    @Req() req,
    @Body() body: AddProductsDto,
  ) {
    return this.storefrontsService.addProducts(
      Number(id),
      req.user.userId,
      body.productIds,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Req() req,
  ) {
    return this.storefrontsService.removeProduct(
      Number(id),
      req.user.userId,
      Number(productId),
    );
  }
}
