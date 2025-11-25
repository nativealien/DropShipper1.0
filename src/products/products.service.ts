import { Injectable } from '@nestjs/common';
import { CjProductsService } from 'src/integrations/cj/cj-products.service';
import { CjAuthService } from 'src/integrations/cj/cj-auth.service';

@Injectable()
export class ProductsService {
    constructor(
        private cjProductsService: CjProductsService,
        private cjAuthService: CjAuthService
    ) {}

    async testProducts() {
        console.log("Test Products");
        const test = await this.cjAuthService.getCjAuthToken();
        console.log(test);
        return test;
    }
}
