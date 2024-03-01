import {
  ApiClientError,
  type ApiResponse,
  type HttpClientConfig,
  type RequestOptions,
} from '../types/api';

export class HttpClient {
  private readonly config: Required<Pick<HttpClientConfig, 'baseUrl' | 'timeout'>> &
    HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
  }

  private buildUrl(path: string, params?: RequestOptions['params']): string {
    const url = new URL(path, this.config.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const token = this.config.getAccessToken ? await this.config.getAccessToken() : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, params, signal } = options;
    const authHeaders = await this.getAuthHeaders();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    if (signal) {
      signal.addEventListener('abort', () => controller.abort(), { once: true });
    }

    try {
      const response = await fetch(this.buildUrl(path, params), {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...this.config.headers,
          ...authHeaders,
          ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (response.status === 401) {
        this.config.onUnauthorized?.();
      }

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new ApiClientError(response.status, {
          code: payload?.error?.code ?? 'INTERNAL_ERROR',
          message: payload?.error?.message ?? response.statusText,
          details: payload?.error?.details,
          requestId: payload?.error?.requestId ?? response.headers.get('x-request-id') ?? undefined,
        });
      }

      return payload as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  get<T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'POST', body });
  }

  put<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PUT', body });
  }

  patch<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PATCH', body });
  }

  delete<T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }

  unwrap<T>(response: ApiResponse<T>): T {
    return response.data;
  }
}

export function createHttpClient(config: HttpClientConfig): HttpClient {
  return new HttpClient(config);
}
