import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { API_ROUTES } from '@/shared/api/api-routes'
import { HttpHandler } from '@/shared/api/http-handler'
import { IQuoteFilter } from '@/shared/interfaces/IFilters'

import { IApiCreateQuote, IApiQuote, IApiUpdateQuote } from '../models/IApiQuote'

export interface QuoteDatasource {
  getAll(): Promise<IApiQuote[]>
  create(quote: IApiCreateQuote): Promise<IApiQuote>
  update(id: number, quote: IApiUpdateQuote): Promise<IApiQuote>
  delete(id: number): Promise<IApiQuote>
  getById(id: number): Promise<IApiQuote>
  getByFilter(paramsFilter: IQuoteFilter): Promise<IApiQuote[]>
}

export class QuotesDatasourceImpl implements QuoteDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): QuoteDatasource {
    return new QuotesDatasourceImpl()
  }

  async getAll(): Promise<IApiQuote[]> {
    return await this.httpClient.get<IApiQuote[]>(API_ROUTES.APPOINTMENTS.GET_ALL)
  }

  async create(quote: IApiCreateQuote): Promise<IApiQuote> {
    return await this.httpClient.post<IApiQuote>(API_ROUTES.APPOINTMENTS.CREATE, quote)
  }

  async update(id: number, quote: IApiUpdateQuote): Promise<IApiQuote> {
    return await this.httpClient.put<IApiQuote>(API_ROUTES.APPOINTMENTS.UPDATE(id), quote)
  }

  async delete(id: number): Promise<IApiQuote> {
    return await this.httpClient.delete<IApiQuote>(API_ROUTES.APPOINTMENTS.DELETE(id))
  }

  async getById(id: number): Promise<IApiQuote> {
    return await this.httpClient.get<IApiQuote>(API_ROUTES.APPOINTMENTS.GET_BY_ID(id))
  }

  async getByFilter(paramsFilter: IQuoteFilter): Promise<IApiQuote[]> {
    return await this.httpClient.get<IApiQuote[]>(API_ROUTES.APPOINTMENTS.GET_BY_FILTER(paramsFilter))
  }
}
