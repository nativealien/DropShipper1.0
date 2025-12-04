import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CJ_API_VERSION_PATH, CJ_API_KEY_ENV, CJ_ACCESS_TOKEN_ENV, CJ_AUTH_HEADER } from './cj.constants';
import { CjApiBaseResponse, CjTokenData } from './cj.types';

interface TokenCache {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiry: number | null;   // epoch ms
  refreshTokenExpiry: number | null;  // epoch ms
}

@Injectable()
export class CjAuthService {
  private readonly logger = new Logger(CjAuthService.name);
  private cache: TokenCache = {
    accessToken: null,
    refreshToken: null,
    accessTokenExpiry: null,
    refreshTokenExpiry: null,
  };

  constructor(private readonly http: HttpService) {}

  private parseIsoToMs(iso: string | null | undefined): number | null {
    if (!iso) return null;
    return new Date(iso).getTime();
  }

  private isExpired(timestamp: number | null, skewSeconds = 60): boolean {
    if (!timestamp) return true;
    return Date.now() + skewSeconds * 1000 >= timestamp;
  }

  private get apiKey(): string {
    const key = process.env[CJ_API_KEY_ENV];
    if (!key) {
      throw new InternalServerErrorException(
        `CJ API key missing. Set ${CJ_API_KEY_ENV} in your environment.`,
      );
    }
    return key;
  }

  private get directAccessToken(): string | null {
    return process.env[CJ_ACCESS_TOKEN_ENV] || null;
  }

  /**
   * Get the CJ auth header name
   */
  getAuthHeaderName(): string {
    return CJ_AUTH_HEADER;
  }

  async getAccessTokenRaw(): Promise<CjApiBaseResponse<CjTokenData>> {
    const url = `${CJ_API_VERSION_PATH}/v1/authentication/getAccessToken`;
    const payload = { apiKey: this.apiKey };

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<CjTokenData>>(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    if (data.code !== 200 || !data.data) {
      this.logger.error(`Failed to get CJ access token: ${data.message}`);
      throw new InternalServerErrorException('Failed to get CJ access token');
    }

    const tokenData = data.data;

    this.cache.accessToken = tokenData.accessToken;
    this.cache.refreshToken = tokenData.refreshToken;
    this.cache.accessTokenExpiry = this.parseIsoToMs(tokenData.accessTokenExpiryDate);
    this.cache.refreshTokenExpiry = this.parseIsoToMs(tokenData.refreshTokenExpiryDate);

    return data;
  }

  async refreshAccessTokenRaw(): Promise<CjApiBaseResponse<CjTokenData>> {
    if (!this.cache.refreshToken) {
      return this.getAccessTokenRaw();
    }

    const url = `${CJ_API_VERSION_PATH}/v1/authentication/refreshAccessToken`;
    const payload = { refreshToken: this.cache.refreshToken };

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<CjTokenData>>(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    if (data.code !== 200 || !data.data) {
      this.logger.error(`Failed to refresh CJ access token: ${data.message}`);
      // Fallback to full re-auth
      return this.getAccessTokenRaw();
    }

    const tokenData = data.data;

    this.cache.accessToken = tokenData.accessToken;
    this.cache.refreshToken = tokenData.refreshToken;
    this.cache.accessTokenExpiry = this.parseIsoToMs(tokenData.accessTokenExpiryDate);
    this.cache.refreshTokenExpiry = this.parseIsoToMs(tokenData.refreshTokenExpiryDate);

    return data;
  }

  /**
   * Public helper: always returns a valid access token, refreshing as needed.
   * If CJ_ACCESS_TOKEN is set in environment, it will be used directly.
   */
  async getValidAccessToken(): Promise<string> {
    // If direct access token is provided via env var, use it
    const directToken = this.directAccessToken;
    if (directToken) {
      return directToken;
    }

    // Otherwise, use the authentication flow
    if (!this.cache.accessToken || this.isExpired(this.cache.accessTokenExpiry)) {
      if (
        this.cache.refreshToken &&
        !this.isExpired(this.cache.refreshTokenExpiry, 0)
      ) {
        await this.refreshAccessTokenRaw();
      } else {
        await this.getAccessTokenRaw();
      }
    }

    if (!this.cache.accessToken) {
      throw new InternalServerErrorException('CJ access token unavailable');
    }

    return this.cache.accessToken;
  }

  async logout(): Promise<CjApiBaseResponse<boolean>> {
    const url = `${CJ_API_VERSION_PATH}/v1/authentication/logout`;
    const accessToken = await this.getValidAccessToken();

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<boolean>>(
        url,
        {},
        { headers: { [CJ_AUTH_HEADER]: accessToken } },
      ),
    );

    // Clear cache regardless
    this.cache = {
      accessToken: null,
      refreshToken: null,
      accessTokenExpiry: null,
      refreshTokenExpiry: null,
    };

    return data;
  }

  // --- Optional advanced flows: authorize URL & exchange code ---

  async getAuthorizeUrl(params: {
    email: string;
    redirectUri?: string;
    callbackUri?: string;
    userName: string;
    state?: string;
    openId?: number;
  }): Promise<CjApiBaseResponse<{ cjRedirectUri: string }>> {
    const url = `${CJ_API_VERSION_PATH}/v1/authentication/getAuthorizeUrl`;
    const accessToken = await this.getValidAccessToken();

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<{ cjRedirectUri: string }>>(url, params, {
        headers: {
          'Content-Type': 'application/json',
          [CJ_AUTH_HEADER]: accessToken,
        },
      }),
    );

    return data;
  }

  async exchangeAccessToken(code: string): Promise<CjApiBaseResponse<CjTokenData>> {
    const url = `${CJ_API_VERSION_PATH}/v1/authentication/exchangeAccessToken`;
    const accessToken = await this.getValidAccessToken();

    const { data } = await lastValueFrom(
      this.http.post<CjApiBaseResponse<CjTokenData>>(url, { code }, {
        headers: {
          'Content-Type': 'application/json',
          [CJ_AUTH_HEADER]: accessToken,
        },
      }),
    );

    return data;
  }
}

