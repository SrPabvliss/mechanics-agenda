import { AxiosAdapter } from '@/core/infrastructure/http/axios-adapter'
import { API_ROUTES } from '@/shared/api/api-routes'
import { HttpHandler } from '@/shared/api/http-handler'
import { IReviewFilter } from '@/shared/interfaces/IFilters'

import { IApiCreateReview, IApiReview, IApiUpdateReview } from '../models/IApiReview'

export interface ReviewDatasource {
  getAll(): Promise<IApiReview[] | undefined>
  create(quote: IApiCreateReview): Promise<IApiReview | undefined>
  update(id: number, quote: IApiUpdateReview): Promise<IApiReview | undefined>
  delete(id: number): Promise<IApiReview | undefined>
  getById(id: number): Promise<IApiReview | undefined>
  getByFilter(paramsFilter: IReviewFilter): Promise<IApiReview[] | undefined>
}

export class ReviewDatasourceImpl implements ReviewDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosAdapter.getInstance()
  }

  static getInstance(): ReviewDatasource {
    return new ReviewDatasourceImpl()
  }

  async getAll() {
    const { data, error } = await this.httpClient.get<IApiReview[]>(API_ROUTES.INSPECTIONS.GET_ALL)
    if (error) return
    return data
  }

  async create(quote: IApiCreateReview) {
    const { data, error } = await this.httpClient.post<IApiReview>(API_ROUTES.INSPECTIONS.CREATE, quote)
    if (error) return
    return data
  }

  async update(id: number, quote: IApiUpdateReview) {
    const { data, error } = await this.httpClient.patch<IApiReview>(API_ROUTES.INSPECTIONS.UPDATE(id), quote)
    if (error) return
    return data
  }

  async delete(id: number) {
    const { data, error } = await this.httpClient.delete<IApiReview>(API_ROUTES.INSPECTIONS.DELETE(id))
    if (error) return
    return data
  }

  async getById(id: number) {
    const { data, error } = await this.httpClient.get<IApiReview>(API_ROUTES.INSPECTIONS.GET_BY_ID(id))
    if (error) return
    return data
  }

  async getByFilter(paramsFilter: IReviewFilter) {
    const { data, error } = await this.httpClient.get<IApiReview[]>(API_ROUTES.INSPECTIONS.GET_BY_FILTER(paramsFilter))
    if (error) return
    return data
  }
}
