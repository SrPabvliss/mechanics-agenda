import { ACCESS_TOKEN_COOKIE_NAME } from '@/shared/api/api-routes'
import { getCookie } from '@/shared/api/cookies-util'
import { HttpHandler, HttpResponse } from '@/shared/api/http-handler'
import { MESSAGES } from '@/shared/constants/messages'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

import { handleError } from './error-handler'

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  successMessage?: string
}

export class AxiosAdapter implements HttpHandler {
  private static instance: AxiosAdapter
  private axiosInstance: AxiosInstance

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getCookie(ACCESS_TOKEN_COOKIE_NAME)
        if (token) {
          config.headers.Authorization = `Bearer ${token.replaceAll('"', '')}`
        } else {
          delete config.headers.Authorization
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const customConfig = response.config as CustomAxiosRequestConfig
        const successMessage = customConfig.successMessage || MESSAGES.DEFAULT_SUCCESS_MESSAGE

        if (!['get'].includes(response.config.method || '')) toast.success(successMessage)
        return response
      },
      (error) => {
        handleError(error)
        return Promise.reject(error)
      },
    )
  }

  public static getInstance(): AxiosAdapter {
    if (!this.instance) {
      this.instance = new AxiosAdapter(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000')
    }
    return this.instance
  }

  async get<T>(url: string, config?: CustomAxiosRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, config)
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  }

  async post<T>(url: string, data: any, config?: CustomAxiosRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data, config)
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  }

  async put<T>(url: string, data: any, config?: CustomAxiosRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put<T>(url, data, config)
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  }

  async patch<T>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch<T>(url, data, config)
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  }

  async delete<T>(url: string, config?: CustomAxiosRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(url, config)
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  }

  setAccessToken(accessToken: string | null): void {
    this.axiosInstance.defaults.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : ''
  }
}
