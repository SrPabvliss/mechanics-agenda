import { ACCESS_TOKEN_COOKIE_NAME } from '@/shared/api/api-routes'
import { getCookie } from '@/shared/api/cookies-util'
import { HttpHandler } from '@/shared/api/http-handler'
import { HTTP_STATUS_CODES } from '@/shared/api/http-status-codes'
import { DEFAULT_SUCCESS_MESSAGE } from '@/shared/constants/messages'
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'

export class AxiosClient implements HttpHandler {
  private static instance: AxiosClient
  private axiosInstance: AxiosInstance
  private static readonly baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  private static accessToken: string | null = null

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: AxiosClient.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getCookie(ACCESS_TOKEN_COOKIE_NAME)
        if (token) {
          config.headers.Authorization = `Bearer ${token.replaceAll('"', '')}`
          AxiosClient.setAccessToken(token.replaceAll('"', ''))
        } else {
          document.dispatchEvent(new CustomEvent('unauthorized'))
        }
        return config
      },
      (error) => {
        Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (response.config?.headers?.['X-Success-Message'] && !['get'].includes(response.config.method || '')) {
          toast.success(response.config.headers['X-Success-Message'])
        }
        return response
      },
      (error) => {
        if (error.response) {
          toast.error(`Error: ${error.response.status} ${error.response.data?.message || error.message}`)
        } else {
          toast.error(`Error: ${error.message}`)
        }
        if (error.response?.status === HTTP_STATUS_CODES.FORBIDDEN) {
          if (typeof window !== 'undefined') {
            window.location.href = '/dashboard'
          }
        }
        return Promise.reject(error)
      },
    )
  }

  public static getInstance(): AxiosClient {
    if (!this.instance) {
      this.instance = new AxiosClient()
    }
    return this.instance
  }

  public static setAccessToken(accessToken: string): void {
    this.accessToken = accessToken
    if (this.instance) {
      this.instance.axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    }
  }

  async get<T>(url: string, message?: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, {
      ...config,
      headers: {
        ...config?.headers,
        'X-Success-Message': message || DEFAULT_SUCCESS_MESSAGE,
      },
    })
    return response.data
  }

  async post<T>(url: string, data: any, message?: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        'X-Success-Message': message || DEFAULT_SUCCESS_MESSAGE,
      },
    })
    return response.data
  }

  async put<T>(url: string, data: any, message?: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put<T>(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        'X-Success-Message': message || DEFAULT_SUCCESS_MESSAGE,
      },
    })
    return response.data
  }

  async patch<T>(url: string, data: any, message?: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch<T>(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        'X-Success-Message': message || DEFAULT_SUCCESS_MESSAGE,
      },
    })
    return response.data
  }

  async delete<T>(url: string, message?: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(url, {
      ...config,
      headers: {
        ...config?.headers,
        'X-Success-Message': message || DEFAULT_SUCCESS_MESSAGE,
      },
    })
    return response.data
  }
}
