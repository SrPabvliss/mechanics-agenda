import { HttpHandler, HttpResponse } from '@/shared/api/http-handler'

export class HttpClient implements HttpHandler {
  private handler: HttpHandler

  constructor(handler: HttpHandler) {
    this.handler = handler
  }

  async get<T>(url: string, config?: any): Promise<HttpResponse<T>> {
    return this.handler.get(url, config)
  }

  async post<T>(url: string, data: any, config?: any): Promise<HttpResponse<T>> {
    return this.handler.post(url, data, config)
  }

  async put<T>(url: string, data: any, config?: any): Promise<HttpResponse<T>> {
    return this.handler.put(url, data, config)
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<HttpResponse<T>> {
    return this.handler.patch(url, data, config)
  }

  async delete<T>(url: string, config?: any): Promise<HttpResponse<T>> {
    return this.handler.delete(url, config)
  }

  setAccessToken(accessToken: string | null): void {
    this.handler.setAccessToken(accessToken)
  }
}
