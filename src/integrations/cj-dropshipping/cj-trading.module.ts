import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CjAuthService } from './cj-auth.service';
import { CjSettingsService } from './cj-settings.service';
import { CjProductsService } from './cj-products.service';
import { CjShoppingService } from './cj-shopping.service';
import { CjLogisticsService } from './cj-logistics.service';
import { CjWebhookService } from './cj-webhook.service';
import { CjWarehouseService } from './cj-warehouse.service';

import { CJ_API_BASE_URL } from './cj.constants';

@Module({
  imports: [
    HttpModule.register({
      baseURL: CJ_API_BASE_URL,
      timeout: 10000,
    }),
  ],
  providers: [
    CjAuthService,
    CjSettingsService,
    CjProductsService,
    CjShoppingService,
    CjLogisticsService,
    CjWebhookService,
    CjWarehouseService,
  ],
  exports: [
    CjAuthService,
    CjSettingsService,
    CjProductsService,
    CjShoppingService,
    CjLogisticsService,
    CjWebhookService,
    CjWarehouseService,
  ],
})
export class CjTradingModule {}
