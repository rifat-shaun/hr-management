export type THttpRequestData = Record<string, unknown>;
export type THttpRequestHeaders = Record<string, string>;
export type THttpRequestParams = Record<string, unknown>;
export type THTTPRequestInfo = Partial<{
  url: string;
  method: string;
  status: number;
}>;

export interface IHttpRequestConfig {
  headers?: THttpRequestHeaders;
  params?: THttpRequestParams;
  signal?: unknown;
}

export interface IHttpClient {
  readonly baseUrl: string;
  get<R>(url: string, config?: IHttpRequestConfig): Promise<R>;
  post<R>(url: string, data?: THttpRequestData, config?: IHttpRequestConfig): Promise<R>;
  put<R>(url: string, data?: THttpRequestData, config?: IHttpRequestConfig): Promise<R>;
  patch<R>(url: string, data?: THttpRequestData, config?: IHttpRequestConfig): Promise<R>;
  delete<R>(url: string, config?: IHttpRequestConfig): Promise<R>;
  postFormData<R>(url: string, data: THttpRequestData): Promise<R>;
  injectAuthHeaders(injectAuthHeaders: string): void;
  removeAuthHeaders(): void;
}

export class HTTPError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string = '',
    public readonly name: string = '',
  ) {
    super(message);
  }
}

export interface IAPIResponse<T> {
  data: T;
  message: string;
  success: boolean;
  status?: number;
}

export type B = Record<string, unknown>;
export type R = Promise<IAPIResponse<any>>;