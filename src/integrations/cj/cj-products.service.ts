import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../common/http/http-service.service';

@Injectable()
export class CjProductsService {
    private readonly apiKey: string;
    private readonly accessToken: string;
    private readonly refreshToken: string;
    private readonly baseUrl: string;
    private readonly endpoint = 'product';

    constructor(
        private readonly configService: ConfigService,
        private readonly httpClient: HttpClientService,
    ){
        this.baseUrl = this.configService.get<string>('CJ_URL') ?? '';
        this.apiKey = this.configService.get<string>('CJ_API_KEY') ?? '';
        this.accessToken = this.configService.get<string>('CJ_ACCESS_TOKEN') ?? '';
        this.refreshToken = this.configService.get<string>('CJ_REFRESH_TOKEN') ?? '';
    }

    async updateCategorys() {
        return this.httpClient.get(`${this.endpoint}/getCategory`, {
            baseUrl: this.baseUrl,
            headers: {
                "CJ-Access-Token": this.accessToken,
            },
        });
    }

    async getWarehouseList() {
        return this.httpClient.get(`${this.endpoint}/globalWarehouseList`, {
            baseUrl: this.baseUrl,
            headers: {
                "CJ-Access-Token": this.accessToken,
            },
        });
    }

    async getProductsCat1(categoryId: string, size?: number) {
        console.log('getProductsCat1:', categoryId);
        return this.httpClient.get(`${this.endpoint}/listV2?page=1&size=${size ? size : 10}&categoryId=${categoryId}`, {
            baseUrl: this.baseUrl,
            headers: {
                "CJ-Access-Token": this.accessToken,
            },
        });
    }

    async getProductsCat2(categoryId: string, size?: number) {
        return this.httpClient.get(`${this.endpoint}/listV2?page=1&size=${size ? size : 10}&lv2categoryList=${categoryId}`, {
            baseUrl: this.baseUrl,
            headers: {
                "CJ-Access-Token": this.accessToken,
            },
        });
    }

    async getProductsCat3(categoryId: string, size?: number) {
        return this.httpClient.get(`${this.endpoint}/listV2?page=1&size=${size ? size : 10}&lv3categoryList=${categoryId}`, {
            baseUrl: this.baseUrl,
            headers: {
                "CJ-Access-Token": this.accessToken,
            },
        });
    }

    async getProductsBySearch(search: string, size?: number) {
        return this.httpClient.get(`${this.endpoint}/listV2?page=1&size=${size ? size : 10}&keyWord=${search}`, {
            baseUrl: this.baseUrl,
            headers: {
                "CJ-Access-Token": this.accessToken,
            },
        });
    }

    async getProductDetails(productId?: string, sku?: string, vsku?: string) {
        return this.httpClient.get(`${this.endpoint}/query?${productId ? `id=${productId}` : sku ? `productSku=${sku}` : vsku ? `variantSku=${vsku}` : ''}`, {
            baseUrl: this.baseUrl,
            headers: {
                "CJ-Access-Token": this.accessToken,
            },
        });
    }
}
