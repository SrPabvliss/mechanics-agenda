export interface HttpHandler {
  get<T>(url: string, config?: any): Promise<HttpResponse<T>>
  post<T>(url: string, data: any, config?: any): Promise<HttpResponse<T>>
  put<T>(url: string, data: any, config?: any): Promise<HttpResponse<T>>
  patch<T>(url: string, data?: any, config?: any): Promise<HttpResponse<T>>
  delete<T>(url: string, config?: any): Promise<HttpResponse<T>>
  setAccessToken(accessToken: string | null): void
}

export interface HttpResponse<T> {
  data?: T
  error?: unknown
}
