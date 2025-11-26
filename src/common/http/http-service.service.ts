// src/common/http/http-client.service.ts
import { Injectable, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosRequestConfig, Method } from 'axios';

interface HttpRequestOptions extends AxiosRequestConfig {
  baseUrl?: string; // <- which API to call
}

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  constructor(private readonly http: HttpService) {}

  private buildUrl(baseUrl: string | undefined, path: string): string {
    if (!baseUrl) return path; // allow full URLs or absolute paths
    return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  }

  private handleAxiosError(method: Method, url: string, error: unknown): never {
    const axiosError = error as AxiosError<{ message?: string; code?: number }>;
    const status = axiosError.response?.status ?? 500;
    const message =
      axiosError.response?.data?.message ??
      axiosError.message ??
      'HTTP request failed';

    this.logger.error(
      `${method.toUpperCase()} ${url} failed (${status}): ${message}`,
    );

    throw new HttpException(message, status);
  }

  async request<T = any>(
    method: Method,
    path: string,
    options: HttpRequestOptions = {},
  ): Promise<T> {
    const { baseUrl, ...axiosConfig } = options;
    const url = this.buildUrl(baseUrl, path);

    try {
      const { data } = await firstValueFrom(
        this.http.request<T>({
          ...axiosConfig,
          method,
          url,
        }),
      );

      return data;
    } catch (error) {
      this.handleAxiosError(method, url, error);
    }
  }

  // Convenience helpers for all verbs:

  async get<T = any>(
    path: string,
    options?: HttpRequestOptions,
  ): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  async post<T = any>(
    path: string,
    data?: unknown,
    options?: HttpRequestOptions,
  ): Promise<T> {
    return this.request<T>('POST', path, { ...options, data });
  }

  async put<T = any>(
    path: string,
    data?: unknown,
    options?: HttpRequestOptions,
  ): Promise<T> {
    return this.request<T>('PUT', path, { ...options, data });
  }

  async patch<T = any>(
    path: string,
    data?: unknown,
    options?: HttpRequestOptions,
  ): Promise<T> {
    return this.request<T>('PATCH', path, { ...options, data });
  }

  async delete<T = any>(
    path: string,
    options?: HttpRequestOptions,
  ): Promise<T> {
    return this.request<T>('DELETE', path, options);
  }
}

