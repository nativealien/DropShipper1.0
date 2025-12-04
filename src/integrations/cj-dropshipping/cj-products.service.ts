import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CJ_API_VERSION_PATH, CJ_AUTH_HEADER } from './cj.constants';
import {
  CjApiBaseResponse,
  CjPaginated,
  CjListProductsV2Data,
  CjProduct,
  CjProductDetail,
} from './cj.types';
import { CjAuthService } from './cj-auth.service';

@Injectable()
export class CjProductsService {
  constructor(
    private readonly http: HttpService,
    private readonly auth: CjAuthService,
  ) {}

  private async headers() {
    const token = await this.auth.getValidAccessToken();
    return { [CJ_AUTH_HEADER]: token };
  }

  // --- 1. Product categories & lists ---

  async getCategories(): Promise<CjApiBaseResponse<any[]>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/getCategory`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any[]>>(url, { headers }),
    );
    return data;
  }

  async getProductDetail(pid: string): Promise<CjApiBaseResponse<CjProductDetail>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/query`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<CjProductDetail>>(url, {
        headers,
        params: { pid },
      }),
    );
    return data;
  }

  async listProductsV2(params: {
    page?: number;
    size?: number;
    keyWord?: string;
    [key: string]: any;
  }): Promise<CjApiBaseResponse<CjListProductsV2Data<CjProduct>>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/listV2`;
    const headers = await this.headers();
    
    // Build query string for logging
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => acc.append(key, String(v)));
          } else {
            acc.append(key, String(value));
          }
        }
        return acc;
      }, new URLSearchParams())
    ).toString();
    
    // console.log('🌐 CJ API Request URL:', `${url}${queryString ? '?' + queryString : ''}`);
    // console.log('📦 Request Params:', JSON.stringify(params, null, 2));
    
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<CjListProductsV2Data<CjProduct>>>(url, {
        headers,
        params,
      }),
    );
    
    // console.log('✅ Response Success:', data.result);
    // console.log('📊 Response Message:', data.message);
    // if (data.data?.content && data.data.content.length > 0) {
    //   const totalProducts = data.data.content.reduce((sum, item) => sum + (item.productList?.length || 0), 0);
    //   console.log('📋 Products Count:', totalProducts);
    //   console.log('📄 Page:', data.data.pageNumber, '/', data.data.totalPages);
    //   console.log('📊 Total Records:', data.data.totalRecords);
    // }
    
    return data;
  }

  async listProducts(params: {
    pageNum?: number;
    pageSize?: number;
    categoryId?: string;
    pid?: string;
    productSku?: string;
    [key: string]: any;
  }): Promise<CjApiBaseResponse<CjPaginated<any>>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/list`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<CjPaginated<any>>>(url, {
        headers,
        params,
      }),
    );
    return data;
  }

  async getGlobalWarehouseList(): Promise<CjApiBaseResponse<any[]>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/globalWarehouseList`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any[]>>(url, { headers }),
    );
    return data;
  }

  // --- 2. Product details & my products ---

  async getProductByPid(pid: string): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/query`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any>>(url, {
        headers,
        params: { pid },
      }),
    );
    return data;
  }

  async addToMyProduct(productId: string): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/addToMyProduct`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<any>>(
        url,
        { productId },
        {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    return data;
  }

  async queryMyProducts(params: {
    keyword?: string;
    categoryId?: string;
    startAt?: string;
    endAt?: string;
    isListed?: number;
    [key: string]: any;
  }): Promise<CjApiBaseResponse<CjPaginated<any>>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/myProduct/query`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<CjPaginated<any>>>(url, {
        headers,
        params,
      }),
    );
    return data;
  }

  // --- 3. Variants & stock ---

  async queryVariantsByPid(pid: string): Promise<CjApiBaseResponse<any[]>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/variant/query`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any[]>>(url, {
        headers,
        params: { pid },
      }),
    );
    return data;
  }

  async queryVariantByVid(vid: string): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/variant/queryByVid`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any>>(url, {
        headers,
        params: { vid },
      }),
    );
    return data;
  }

  async getInventoryByVid(vid: string): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/stock/queryByVid`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any>>(url, {
        headers,
        params: { vid },
      }),
    );
    return data;
  }

  async getInventoryBySku(sku: string): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/stock/queryBySku`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any>>(url, {
        headers,
        params: { sku },
      }),
    );
    return data;
  }

  async getInventoryByPid(pid: string): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/stock/getInventoryByPid`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any>>(url, {
        headers,
        params: { pid },
      }),
    );
    return data;
  }

  // --- 4. Reviews ---

  // Deprecated comments endpoint kept just in case you want it
  async getCommentsDeprecated(params: {
    pid: string;
    score?: number;
    pageNum?: number;
    pageSize?: number;
  }): Promise<CjApiBaseResponse<CjPaginated<any>>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/comments`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<CjPaginated<any>>>(url, {
        headers,
        params,
      }),
    );
    return data;
  }

  async getProductComments(params: {
    pid: string;
    score?: number;
    pageNum?: number;
    pageSize?: number;
  }): Promise<CjApiBaseResponse<CjPaginated<any>>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/productComments`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<CjPaginated<any>>>(url, {
        headers,
        params,
      }),
    );
    return data;
  }

  // --- 5. Sourcing ---

  async createSourcing(payload: {
    thirdProductId?: string;
    thirdVariantId?: string;
    thirdProductSku?: string;
    productName: string;
    productImage: string;
    productUrl?: string;
    remark?: string;
    price?: string;
  }): Promise<CjApiBaseResponse<{ cjSourcingId: string; result: string }>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/sourcing/create`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.post<
        CjApiBaseResponse<{ cjSourcingId: string; result: string }>
      >(url, payload, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      }),
    );
    return data;
  }

  async querySourcing(sourceIds: string[]): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/product/sourcing/query`;
    const headers = await this.headers();
    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<any>>(
        url,
        { sourceIds },
        {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    return data;
  }
}

