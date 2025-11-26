import { Body, Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('/test')
    testProducts() {
        return this.productsService.testProducts();
    }

    @Get('/test-categorys')
    testCategorys() {
        return this.productsService.testCategorys();
    }

    @Get('/search-products')
    searchProducts(@Query('search') search: string) {
        return this.productsService.searchProducts(search);
    }

    @Get('/get-products-by-category')
    getProductsByCategory(@Query('level') level: string, @Query('categoryId') categoryId: string) {
        return this.productsService.getProductsByCategory(level, categoryId);
    }

    @Get('/get-warehouse-list')
    getWarehouseList() {
        return this.productsService.getWarehouseList();
    }

    @Get('/get-product-details')
    getProductDetails(@Query('sku') sku?: string, @Query('vsku') vsku?: string) {
        return this.productsService.getProductDetails(sku, vsku);
    }
}
