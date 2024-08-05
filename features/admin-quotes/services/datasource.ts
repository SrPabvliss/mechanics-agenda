import { AxiosAdapter } from '@/core/infrastructure/http/axios-adapter'
import { API_ROUTES } from '@/shared/api/api-routes'
import { HttpHandler } from '@/shared/api/http-handler'
import { MESSAGES } from '@/shared/constants/messages'
import { IAdminQuoteFilter } from '@/shared/interfaces/IFilters'

import { IApiAdminQuote, IApiCreateAdminQuote, IApiUpdateAdminQuote } from '../models/IApiAdminQuotes'

export interface AdminQuoteDatasource {
  getAll(): Promise<IApiAdminQuote[] | undefined>
  create(quote: IApiCreateAdminQuote): Promise<IApiAdminQuote | undefined>
  update(id: number, quote: IApiUpdateAdminQuote): Promise<IApiAdminQuote | undefined>
  delete(id: number): Promise<IApiAdminQuote | undefined>
  getById(id: number): Promise<IApiAdminQuote | undefined>
  getByFilter(paramsFilter: IAdminQuoteFilter): Promise<IApiAdminQuote[] | undefined>
}

export class AdminQuotesDatasourceImpl implements AdminQuoteDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosAdapter.getInstance()
  }

  static getInstance(): AdminQuoteDatasource {
    return new AdminQuotesDatasourceImpl()
  }

  async getAll() {
    const { data, error } = await this.httpClient.get<IApiAdminQuote[]>(API_ROUTES.REMINDERS.GET_ALL)
    if (error) return
    return data
  }

  async create(quote: IApiCreateAdminQuote) {
    const { data, error } = await this.httpClient.post<IApiAdminQuote>(API_ROUTES.REMINDERS.CREATE, quote, {
      successMessage: MESSAGES.ADMIN_QUOTES.CREATE,
    })
    if (error) return
    return data
  }

  async update(id: number, quote: IApiUpdateAdminQuote) {
    const { data, error } = await this.httpClient.patch<IApiAdminQuote>(API_ROUTES.REMINDERS.UPDATE(id), quote, {
      successMessage: MESSAGES.ADMIN_QUOTES.UPDATE,
    })
    if (error) return
    return data
  }

  async delete(id: number) {
    const { data, error } = await this.httpClient.delete<IApiAdminQuote>(API_ROUTES.REMINDERS.DELETE(id), {
      successMessage: MESSAGES.ADMIN_QUOTES.DELETE,
    })
    if (error) return
    return data
  }

  async getById(id: number) {
    const { data, error } = await this.httpClient.get<IApiAdminQuote>(API_ROUTES.REMINDERS.GET_BY_ID(id))
    if (error) return
    return data
  }

  async getByFilter(paramsFilter: IAdminQuoteFilter) {
    const { data, error } = await this.httpClient.get<IApiAdminQuote[]>(
      API_ROUTES.REMINDERS.GET_BY_FILTER(paramsFilter),
    )
    if (error) return
    return data
  }
}
