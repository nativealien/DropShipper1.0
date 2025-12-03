import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorefrontsService } from './storefronts.service';
import { StorefrontsController } from './storefronts.controller';
import { Storefront } from './storefront.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Storefront, Product])],
  providers: [StorefrontsService],
  controllers: [StorefrontsController],
})
export class StorefrontsModule {}
