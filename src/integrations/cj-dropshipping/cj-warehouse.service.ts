import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CjAuthService } from './cj-auth.service';
import { CJ_API_VERSION_PATH, CJ_AUTH_HEADER } from './cj.constants';
import { lastValueFrom } from 'rxjs';
import { CjApiBaseResponse } from './cj.types';

@Injectable()
export class CjWarehouseService {
  constructor(
    private readonly http: HttpService,
    private readonly auth: CjAuthService,
  ) {}

  private async headers() {
    const token = await this.auth.getValidAccessToken();
    return { [CJ_AUTH_HEADER]: token };
  }

  // Add concrete warehouse endpoints here as you decide to use them.
  // Example stub:

  async listWarehouses(): Promise<CjApiBaseResponse<any>> {
    // NOTE: Replace with the real warehouse URL from CJ docs
    const url = `${CJ_API_VERSION_PATH}/v1/warehouse/list`;
    const headers = await this.headers();

    const { data } = await lastValueFrom(
      this.http.get<CjApiBaseResponse<any>>(url, { headers }),
    );

    return data;
  }
}

