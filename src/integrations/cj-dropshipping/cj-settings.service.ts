import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CJ_API_VERSION_PATH, CJ_AUTH_HEADER } from './cj.constants';
import { CjApiBaseResponse } from './cj.types';
import { CjAuthService } from './cj-auth.service';

@Injectable()
export class CjSettingsService {
  constructor(
    private readonly http: HttpService,
    private readonly auth: CjAuthService,
  ) {}

  private async withAuthHeaders() {
    const token = await this.auth.getValidAccessToken();
    return { [CJ_AUTH_HEADER]: token };
  }

  async getSettings(): Promise<CjApiBaseResponse<any>> {
    const headers = await this.withAuthHeaders();
    const url = `${CJ_API_VERSION_PATH}/v1/setting/get`;

    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any>>(url, { headers }),
    );

    return data;
  }

  async setAccountSettings(payload: Record<string, any>): Promise<CjApiBaseResponse<any>> {
    const headers = await this.withAuthHeaders();
    const url = `${CJ_API_VERSION_PATH}/v1/setting/account/set`;

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<any>>(url, payload, { headers }),
    );

    return data;
  }

  async deleteAccountSettings(payload: Record<string, any>): Promise<CjApiBaseResponse<any>> {
    const headers = await this.withAuthHeaders();
    const url = `${CJ_API_VERSION_PATH}/v1/setting/account/delete`;

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<any>>(url, payload, { headers }),
    );

    return data;
  }
}

