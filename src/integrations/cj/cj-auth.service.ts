import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../common/http/http-service.service';

@Injectable()
export class CjAuthService {
  private readonly apiKey: string;
  private readonly accessToken: string;
  private readonly refreshToken: string;
  private readonly baseUrl: string;
  private readonly endpoint = 'authentication/';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClientService,
  ) {
    this.baseUrl = this.configService.get<string>('CJ_URL') ?? '';
    this.apiKey = this.configService.get<string>('CJ_API_KEY') ?? '';
    this.accessToken = this.configService.get<string>('CJ_ACCESS_TOKEN') ?? '';
    this.refreshToken = this.configService.get<string>('CJ_REFRESH_TOKEN') ?? '';
  }

  async getCjAuthToken() {
    return this.httpClient.post(
      `${this.endpoint}getAccessToken`,      // just the “ending”
      { apiKey: this.apiKey },
      { baseUrl: this.baseUrl },            // which API
    );
  }

  async refreshCjAuthToken() {
    return this.httpClient.post(
      `${this.endpoint}refreshAccessToken`,
      { apiKey: this.apiKey },
      { baseUrl: this.baseUrl },
    );
  }

  async logoutCjAuthToken() {
    return this.httpClient.post(
      `${this.endpoint}logout`,
      { apiKey: this.apiKey },
      { baseUrl: this.baseUrl },
    );
  }

  async getAccountSettings() {
    return this.httpClient.get('/setting/get', {
      baseUrl: this.baseUrl,
      headers: {
        "CJ-Access-Token": this.accessToken,
      },
    });
  }
}


