import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CjAuthService {
  private readonly apiKey: string;
  private readonly url: string;
  private readonly endpoint = 'authentication/';
  private readonly logger = new Logger(CjAuthService.name);
  private async post<T>(path: string, payload: unknown): Promise<T> {
    try {
      const { data } = await firstValueFrom(this.http.post<T>(path, payload));
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string; code?: number }>;
      const status = axiosError.response?.status ?? 500;
      const message =
        axiosError.response?.data?.message ??
        axiosError.message ??
        'CJ request failed';

      this.logger.error(`POST ${path} failed (${status}): ${message}`);
      throw new HttpException(message, status);
    }
  }

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService
  ) {
    this.url = this.configService.get<string>('CJ_URL') ?? '';
    this.apiKey = this.configService.get<string>('CJ_API_KEY') ?? '';
  }

  async testCjAuth() {
    console.log(this.url, this.apiKey);
    return "Test CJ Auth";
  }

  async getCjAuthToken() {
    return this.post(`${this.endpoint}getAccessToken`, {
      apiKey: this.apiKey,
    });
  }

  async refreshCjAuthToken() {
    return this.post(`${this.endpoint}refreshAccessToken`, {
      apiKey: this.apiKey,
    });
  }

  async logoutCjAuthToken() {
    return this.post(`${this.endpoint}logout`, {
      apiKey: this.apiKey,
    });
  }

}
