import { Body, Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('/test')
    testProducts() {
        return this.productsService.testProducts();
    }
}
