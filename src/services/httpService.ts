import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import { env } from '@/env';

import type { IHttpClient, IHttpRequestConfig, THttpRequestData } from './model';
import { HTTPError } from './model';

interface APIOptions {
  onlyBaseUrl?: boolean;
  ignoreAuth?: boolean;
  v?: string;
}

export const CONFIG = {
  serverURL: env.VITE_API_BASE_URL,
  version: 'v1',
};

export class HttpClient implements IHttpClient {
  public baseUrl: string = CONFIG.serverURL;

  private client: AxiosInstance | null = null;

  private updateClient(baseUrl: string): void {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-Origin': window.location.origin,
      },

      validateStatus: (status: number) => status >= 200 && status < 300,
      withCredentials: true,
    });
  }

  constructor() {
    if (this.baseUrl) {
      this.updateClient(this.baseUrl);
    }
  }

  private buildUrl(url: string, v = 'v1', onlyBaseUrl = false): string {
    if (onlyBaseUrl) {
      return url;
    }

    return `/api/${v}${url}`;
  }

  public injectAuthHeaders(accessToken: string): void {
    if (!this.client) return;
    this.client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  public removeAuthHeaders(): void {
    if (!this.client) return;
    this.client.defaults.headers.common['Authorization'] = null;
  }

  public updateBaseUrl(serverUrl: string): void {
    const baseUrl = serverUrl + CONFIG.version;
    this.baseUrl = baseUrl;
    this.updateClient(baseUrl);
  }

  public get<R>(
    url: string,
    requestConfig?: IHttpRequestConfig,
    apiOptions?: APIOptions,
  ): Promise<R> {
    if (!this.client) return Promise.reject(new Error('Client not initialized'));

    if (apiOptions?.ignoreAuth) {
      this.removeAuthHeaders();
    } else {
      this.injectAuthHeaders(localStorage.getItem('token') || '');
    }

    return this.client
      .get<R>(this.buildUrl(url, apiOptions?.v, apiOptions?.onlyBaseUrl), requestConfig as any)
      .then((response) => response.data)
      .catch(this.onRequestFailure);
  }

  public post<R>(
    url: string,
    data?: THttpRequestData,
    requestConfig?: IHttpRequestConfig,
    apiOptions?: APIOptions,
  ): Promise<R> {
    if (!this.client) return Promise.reject(new Error('Client not initialized'));

    if (apiOptions?.ignoreAuth) {
      this.removeAuthHeaders();
    } else {
      this.injectAuthHeaders(localStorage.getItem('token') || '');
    }
    return this.client
      .post<R>(this.buildUrl(url, apiOptions?.v, apiOptions?.onlyBaseUrl), data, requestConfig as any)
      .then((response) => response.data)
      .catch(this.onRequestFailure);
  }

  public put<R>(
    url: string,
    data?: THttpRequestData,
    requestConfig?: IHttpRequestConfig,
    apiOptions?: APIOptions,
  ): Promise<R> {
    if (!this.client) return Promise.reject(new Error('Client not initialized'));

    if (apiOptions?.ignoreAuth) {
      this.removeAuthHeaders();
    } else {
      this.injectAuthHeaders(localStorage.getItem('token') || '');
    }

    return this.client
      .put<R>(this.buildUrl(url, apiOptions?.v, apiOptions?.onlyBaseUrl), data, requestConfig as any)
      .then((response) => response.data)
      .catch(this.onRequestFailure);
  }

  public patch<R>(
    url: string,
    data?: THttpRequestData,
    requestConfig?: IHttpRequestConfig,
    apiOptions?: APIOptions,
  ): Promise<R> {
    if (!this.client) return Promise.reject(new Error('Client not initialized'));

    if (apiOptions?.ignoreAuth) {
      this.removeAuthHeaders();
    } else {
      this.injectAuthHeaders(localStorage.getItem('token') || '');
    }

    return this.client
      .patch<R>(this.buildUrl(url, apiOptions?.v, apiOptions?.onlyBaseUrl), data, requestConfig as any)
      .then((response) => response.data)
      .catch(this.onRequestFailure);
  }

  public delete<R>(
    url: string,
    requestConfig?: IHttpRequestConfig,
    apiOptions?: APIOptions,
  ): Promise<R> {
    if (!this.client) return Promise.reject(new Error('Client not initialized'));

    if (apiOptions?.ignoreAuth) {
      this.removeAuthHeaders();
    } else {
      this.injectAuthHeaders(localStorage.getItem('token') || '');
    }

    return this.client
      .delete<R>(this.buildUrl(url, apiOptions?.v, apiOptions?.onlyBaseUrl), requestConfig as any)
      .then((response) => response.data)
      .catch(this.onRequestFailure);
  }

  public postFormData<R>(url: string, data: THttpRequestData, apiOptions?: APIOptions): Promise<R> {
    if (!this.client) return Promise.reject(new Error('Client not initialized'));

    if (apiOptions?.ignoreAuth) {
      this.removeAuthHeaders();
    } else {
      this.injectAuthHeaders(localStorage.getItem('token') || '');
    }

    return this.client
      .post(this.buildUrl(url, apiOptions?.v, apiOptions?.onlyBaseUrl), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
      .catch(this.onRequestFailure);
  }

  private onRequestFailure = (error: AxiosError): any => {
    const response: any = error.response;

    if (response?.status && response.status === 503) {
      window.location.href = '/brb';
    }

    if (response?.status && response.status >= 500) {
      throw new HTTPError(
        response.status,
        response?.data?.message || 'Server Error',
        response.data as string,
      );
    }

    if (response?.status && response.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
      throw new HTTPError(
        error.response?.status || -1,
        response?.data?.error ||
        response?.data?.errors ||
        response?.data?.message ||
        response?.data?.detail ||
        error?.message,
      );
    }

    if (response?.status && response.status === 403) {
      throw new HTTPError(
        response.status,
        response?.data?.message || 'You are not authorized to perform this action.',
        response.data as string,
      );
    }
    if (error?.code === 'ERR_NETWORK') {
      throw new HTTPError(response?.data?.message || 'Your Network is not stable');
    }

    if (response?.status !== 401) {
      throw new HTTPError(
        error.response?.status || -1,
        response?.data?.error ||
        response?.data?.errors ||
        response?.data?.message ||
        response?.data?.detail ||
        error?.message,
      );
    }
  };
}