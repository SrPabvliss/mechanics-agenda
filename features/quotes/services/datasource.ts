import { AxiosAdapter } from '@/core/infrastructure/http/axios-adapter'
import { API_ROUTES } from '@/shared/api/api-routes'
import { HttpHandler } from '@/shared/api/http-handler'
import { IQuoteFilter } from '@/shared/interfaces/IFilters'

import { IApiCreateQuote, IApiQuote, IApiUpdateQuote } from '../models/IApiQuote'

export interface QuoteDatasource {
  getAll(): Promise<IApiQuote[] | undefined>
  create(quote: IApiCreateQuote): Promise<IApiQuote | undefined>
  update(id: number, quote: IApiUpdateQuote): Promise<IApiQuote | undefined>
  delete(id: number): Promise<IApiQuote | undefined>
  getById(id: number): Promise<IApiQuote | undefined>
  getByFilter(paramsFilter: IQuoteFilter): Promise<IApiQuote[] | undefined>
}

export class QuotesDatasourceImpl implements QuoteDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosAdapter.getInstance()
  }

  static getInstance(): QuoteDatasource {
    return new QuotesDatasourceImpl()
  }

  async getAll() {
    const { data, error } = await this.httpClient.get<IApiQuote[]>(API_ROUTES.APPOINTMENTS.GET_ALL)
    if (error) return
    return data
  }

  async create(quote: IApiCreateQuote) {
    const { data, error } = await this.httpClient.post<IApiQuote>(API_ROUTES.APPOINTMENTS.CREATE, quote)
    if (error) return
    return data
  }

  async update(id: number, quote: IApiUpdateQuote) {
    const { data, error } = await this.httpClient.patch<IApiQuote>(API_ROUTES.APPOINTMENTS.UPDATE(id), quote)
    if (error) return
    return data
  }

  async delete(id: number) {
    const { data, error } = await this.httpClient.delete<IApiQuote>(API_ROUTES.APPOINTMENTS.DELETE(id))
    if (error) return
    return data
  }

  async getById(id: number) {
    const { data, error } = await this.httpClient.get<IApiQuote>(API_ROUTES.APPOINTMENTS.GET_BY_ID(id))
    if (error) return
    return data
  }

  async getByFilter(paramsFilter: IQuoteFilter) {
    const { data, error } = await this.httpClient.get<IApiQuote[]>(API_ROUTES.APPOINTMENTS.GET_BY_FILTER(paramsFilter))
    if (error) return
    return data
  }
}
