import { Injectable, BadRequestException } from '@nestjs/common';
import { DropshippingProvider } from './dropshipping-provider.enum';
import { ListProductsQueryDto } from './dto/list-products.dto';
import { ListCategoriesQueryDto } from './dto/list-categories.dto';

// Adjust paths to your actual CJ services
import { CjProductsService } from '../../integrations/cj-dropshipping/cj-products.service';
// If you use another service for categories, import it as well:
// import { CjSettingsService } from '../../integrations/cj-trading/cj-settings.service';
import { categorys } from '../../database/categorys';

@Injectable()
export class CatalogService {
  constructor(
    private readonly cjProductsService: CjProductsService,
    // private readonly cjSettingsService: CjSettingsService,
  ) {}

  /**
   * Returns the list of providers this API exposes for catalog browsing.
   * Good for the frontend to dynamically show options.
   */
  listProviders() {
    return [
      {
        id: DropshippingProvider.CJ,
        name: 'CJdropshipping',
      },
      // later add more providers here
    ];
  }

  async listCategories(
    provider: DropshippingProvider,
    _query: ListCategoriesQueryDto,
  ): Promise<any> {
    switch (provider) {
      case DropshippingProvider.CJ:
        return categorys;
      default:
        throw new BadRequestException(`Unsupported provider: ${provider}`);
    }
  }

  async listProducts(
    provider: DropshippingProvider,
    query: ListProductsQueryDto,
  ): Promise<any> {
    switch (provider) {
      case DropshippingProvider.CJ:
        // Map DTO to CJ API v1/product/listV2 parameters
        const params: Record<string, any> = {};

        // Search & Filtering
        if (query.keyWord !== undefined) params.keyWord = query.keyWord;
        if (query.categoryId !== undefined) params.categoryId = query.categoryId;
        if (query.lv2categoryList !== undefined)
          params.lv2categoryList = query.lv2categoryList;
        if (query.lv3categoryList !== undefined)
          params.lv3categoryList = query.lv3categoryList;
        if (query.countryCode !== undefined)
          params.countryCode = query.countryCode;

        // Pagination
        if (query.page !== undefined) params.page = query.page;
        if (query.size !== undefined) params.size = query.size;

        // Price Filtering
        if (query.startSellPrice !== undefined)
          params.startSellPrice = query.startSellPrice;
        if (query.endSellPrice !== undefined)
          params.endSellPrice = query.endSellPrice;

        // Shipping & Product Type
        if (query.addMarkStatus !== undefined)
          params.addMarkStatus = query.addMarkStatus;
        if (query.productType !== undefined) params.productType = query.productType;
        if (query.productFlag !== undefined) params.productFlag = query.productFlag;

        // Inventory Filtering
        if (query.startWarehouseInventory !== undefined)
          params.startWarehouseInventory = query.startWarehouseInventory;
        if (query.endWarehouseInventory !== undefined)
          params.endWarehouseInventory = query.endWarehouseInventory;
        if (query.verifiedWarehouse !== undefined)
          params.verifiedWarehouse = query.verifiedWarehouse;

        // Time Filtering
        if (query.timeStart !== undefined) params.timeStart = query.timeStart;
        if (query.timeEnd !== undefined) params.timeEnd = query.timeEnd;

        // Platform & Warehouse
        if (query.zonePlatform !== undefined)
          params.zonePlatform = query.zonePlatform;
        if (query.isWarehouse !== undefined)
          params.isWarehouse = query.isWarehouse;

        // Currency & Sorting
        if (query.currency !== undefined) params.currency = query.currency;
        if (query.sort !== undefined) params.sort = query.sort;
        if (query.orderBy !== undefined) params.orderBy = query.orderBy;

        // Features
        if (query.features !== undefined) params.features = query.features;

        // Supplier & Certification
        if (query.supplierId !== undefined) params.supplierId = query.supplierId;
        if (query.hasCertification !== undefined)
          params.hasCertification = query.hasCertification;
        if (query.isSelfPickup !== undefined)
          params.isSelfPickup = query.isSelfPickup;
        if (query.customization !== undefined)
          params.customization = query.customization;

        const data = await this.cjProductsService.listProductsV2(params);
        // console.log('🔍 Catalog Service - Query Params:', JSON.stringify(params, null, 2), data?.data?.content?.[0]?.productList);
        return data.data;
      default:
        throw new BadRequestException(`Unsupported provider: ${provider}`);
    }
  }

  async getProduct(
    provider: DropshippingProvider,
    externalId: string,
  ): Promise<any> {
    switch (provider) {
      case DropshippingProvider.CJ:
        // Return the typed CJ product detail object (CjProductDetail)
        const detail = await this.cjProductsService.getProductDetail(externalId);
        console.log(detail.data);
        return detail;
      default:
        throw new BadRequestException(`Unsupported provider: ${provider}`);
    }
  }
}
