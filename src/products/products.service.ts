import { Injectable } from '@nestjs/common';
import { CjProductsService } from 'src/integrations/cj/cj-products.service';
import { CjAuthService } from 'src/integrations/cj/cj-auth.service';

import categorys from '../../data/categorys';

@Injectable()
export class ProductsService {
    constructor(
        private cjProductsService: CjProductsService,
        private cjAuthService: CjAuthService
    ) {}

    async testProducts() {
        console.log("Test Products");
        // const test = await this.cjAuthService.getAccountSettings();
        // console.log(test);
        const cats = await this.cjProductsService.updateCategorys();
        console.log(cats);
        return cats;
    }

    async testCategorys() {
        console.log(categorys);
        return categorys;
    }

    async searchProducts(search: string) {
        const products = await this.cjProductsService.getProductsBySearch(search);
        console.log(products);
        return products;
    }

    async getProductsByCategory(level: string, categoryId: string) {
        if (parseInt(level) === 1) {
            return this.cjProductsService.getProductsCat1(categoryId);
        } else if (parseInt(level) === 2) {
            return this.cjProductsService.getProductsCat2(categoryId);
        } else if (parseInt(level) === 3) {
            return this.cjProductsService.getProductsCat3(categoryId);
        }
    }

    async getWarehouseList() {
        return this.cjProductsService.getWarehouseList();
    }

    async getProductDetails(sku?: string, vsku?: string) {
        return this.cjProductsService.getProductDetails(sku, vsku);
    }
}
