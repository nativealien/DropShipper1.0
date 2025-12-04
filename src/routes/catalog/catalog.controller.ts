import {
    Controller,
    Get,
    Param,
    Query,
    BadRequestException,
    ParseEnumPipe,
  } from '@nestjs/common';
  import { CatalogService } from './catalog.service';
  import { DropshippingProvider } from './dropshipping-provider.enum';
  import { ListProductsQueryDto } from './dto/list-products.dto';
  import { ListCategoriesQueryDto } from './dto/list-categories.dto';
  
  @Controller('catalog')
  export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}
  
    @Get('providers')
    listProviders() {
      return this.catalogService.listProviders();
    }
  
    @Get(':provider/categories')
    async getCategories(
      @Param('provider', new ParseEnumPipe(DropshippingProvider))
      provider: DropshippingProvider,
      @Query() query: ListCategoriesQueryDto,
    ) {
      return this.catalogService.listCategories(provider, query);
    }
  
    @Get(':provider/products')
    async getProducts(
      @Param('provider', new ParseEnumPipe(DropshippingProvider))
      provider: DropshippingProvider,
      @Query() query: ListProductsQueryDto,
    ) {
      return this.catalogService.listProducts(provider, query);
    }
  
    @Get(':provider/products/:externalId')
    async getProduct(
      @Param('provider', new ParseEnumPipe(DropshippingProvider))
      provider: DropshippingProvider,
      @Param('externalId') externalId: string,
    ) {
      if (!externalId) {
        throw new BadRequestException('externalId is required');
      }
      return this.catalogService.getProduct(provider, externalId);
    }
  }
  