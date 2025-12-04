import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CJ_API_VERSION_PATH, CJ_AUTH_HEADER } from './cj.constants';
import { CjApiBaseResponse } from './cj.types';
import { CjAuthService } from './cj-auth.service';

@Injectable()
export class CjLogisticsService {
  constructor(
    private readonly http: HttpService,
    private readonly auth: CjAuthService,
  ) {}

  private async headers() {
    const token = await this.auth.getValidAccessToken();
    return {
      [CJ_AUTH_HEADER]: token,
      'Content-Type': 'application/json',
    };
  }

  async freightCalculate(payload: any): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/logistic/freightCalculate`;
    const headers = await this.headers();

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<any>>(url, payload, { headers }),
    );
    return data;
  }

  async freightCalculateTip(payload: any): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/logistic/freightCalculateTip`;
    const headers = await this.headers();

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<any>>(url, payload, { headers }),
    );
    return data;
  }

  async getTrackInfo(params: any): Promise<CjApiBaseResponse<any>> {
    const url = `${CJ_API_VERSION_PATH}/v1/logistic/getTrackInfo`;
    const token = await this.auth.getValidAccessToken();

    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any>>(url, {
        headers: { [CJ_AUTH_HEADER]: token },
        params,
      }),
    );
    return data;
  }
}

