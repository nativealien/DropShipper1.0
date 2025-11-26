import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CjAuthService } from './cj-auth.service';
import { CjProductsService } from './cj-products.service';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    ConfigModule,
    CommonModule, // <-- instead of HttpModule
  ],
  providers: [CjAuthService, CjProductsService],
  exports: [CjAuthService, CjProductsService],
})
export class CjModule {}
