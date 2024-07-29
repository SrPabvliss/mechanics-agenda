import { AxiosAdapter } from '@/core/infrastructure/http/axios-adapter'
import { API_ROUTES } from '@/shared/api/api-routes'
import { HttpHandler } from '@/shared/api/http-handler'
import { MESSAGES } from '@/shared/constants/messages'

import { IApiReview } from '../../reviews/models/IApiReview'
import { ICreateJob, IJob, IUpdateJob } from '../models/IJob'

export interface JobDatasource {
  getAll(): Promise<IJob[] | undefined>
  getByInspectionId(inspectionId: number): Promise<IJob[] | undefined>
  getById(id: number): Promise<IJob | undefined>
  create(job: ICreateJob): Promise<IJob | undefined>
  update(id: number, job: IUpdateJob): Promise<IJob | undefined>
  delete(id: number): Promise<boolean>
}

export class JobDatasourceImpl implements JobDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosAdapter.getInstance()
  }

  static getInstance(): JobDatasource {
    return new JobDatasourceImpl()
  }

  async getAll() {
    const { data, error } = await this.httpClient.get<IJob[]>(API_ROUTES.JOBS.GET_ALL)
    if (error) return
    return data!
  }

  async getByInspectionId(inspectionId: number) {
    const { data, error } = await this.httpClient.get<IApiReview>(API_ROUTES.INSPECTIONS.GET_BY_ID(inspectionId))
    if (error) return
    return data!.jobs
  }

  async getById(id: number) {
    const { data, error } = await this.httpClient.get<IJob>(API_ROUTES.JOBS.GET_BY_ID(id))
    if (error) return
    return data!
  }

  async create(job: ICreateJob) {
    const { data, error } = await this.httpClient.post<IJob>(API_ROUTES.JOBS.CREATE, job, {
      successMessage: MESSAGES.JOBS.CREATE,
    })
    if (error) return
    return data!
  }

  async update(id: number, job: IUpdateJob) {
    const { data, error } = await this.httpClient.patch<IJob>(API_ROUTES.JOBS.UPDATE(id), job, {
      successMessage: MESSAGES.JOBS.UPDATE,
    })
    if (error) return
    return data!
  }

  async delete(id: number) {
    const { error } = await this.httpClient.delete(API_ROUTES.JOBS.DELETE(id), {
      successMessage: MESSAGES.JOBS.DELETE,
    })
    return !error
  }
}
