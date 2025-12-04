import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

// Import the CJ integration module so its services are available
import { CjTradingModule } from '../../integrations/cj-dropshipping/cj-trading.module';

@Module({
  imports: [CjTradingModule],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}

