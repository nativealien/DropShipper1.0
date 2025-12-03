import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { Variant } from './variant.entity';
import { Storefront } from '../storefronts/storefront.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Variant, Storefront])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
