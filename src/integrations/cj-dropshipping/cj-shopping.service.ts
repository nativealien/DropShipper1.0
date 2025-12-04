import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CJ_API_VERSION_PATH, CJ_AUTH_HEADER } from './cj.constants';
import { CjApiBaseResponse } from './cj.types';
import { CjAuthService } from './cj-auth.service';

@Injectable()
export class CjShoppingService {
  constructor(
    private readonly http: HttpService,
    private readonly auth: CjAuthService,
  ) {}

  private async headers(extra?: Record<string, string>) {
    const token = await this.auth.getValidAccessToken();
    return { [CJ_AUTH_HEADER]: token, ...(extra ?? {}) };
  }

  async batchCreateOrder(payload: any): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/shopping/order/batchCreateOrder`;
    const headers = await this.headers({ 'Content-Type': 'application/json' });

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<any>>(url, payload, { headers }),
    );
    return data;
  }

  async getOrderById(orderId: string): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/shopping/order/queryById`;
    const headers = await this.headers();

    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any>>(url, {
        headers,
        params: { orderId },
      }),
    );
    return data;
  }

  async confirmOrder(payload: any): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/shopping/order/confirm`;
    const headers = await this.headers({ 'Content-Type': 'application/json' });

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<any>>(url, payload, { headers }),
    );
    return data;
  }

  async getBalance(): Promise<CjApiBaseResponse<{ balance: number }>> {
    const url = `${CJ_API_VERSION_PATH}/v1/shopping/pay/getBalance`;
    const headers = await this.headers();

    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<{ balance: number }>>(url, { headers }),
    );
    return data;
  }

  async payWithBalance(payload: any): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/shopping/pay/payBalance`;
    const headers = await this.headers({ 'Content-Type': 'application/json' });

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<any>>(url, payload, { headers }),
    );
    return data;
  }
}

