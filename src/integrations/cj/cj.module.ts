import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CjAuthService } from './cj-auth.service';
import { CjProductsService } from './cj-products.service';


@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('CJ_URL'),
        // timeout: 5000,
        // maxRedirects: 5,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    // HttpModule.register({
    //   baseURL: process.env.CJ_URL,
    //   timeout: 5000,
    //   maxRedirects: 5,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }),
  ],
  providers: [CjAuthService, CjProductsService],
  exports: [CjAuthService,CjProductsService],
})
export class CjModule {}
