import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { API_ROUTES } from '@/shared/api/api-routes'
import { HttpHandler } from '@/shared/api/http-handler'

import { UserAdapter } from '../adapters/UserAdapter'
import { IAPIUser } from '../models/IApiUser'
import { IUser } from '../models/IUser'

export interface UserDatasource {
  getAll(): Promise<IUser[]>
  getByCI(ci: string): Promise<IUser>
}

export class UserDatasourcesImpl implements UserDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): UserDatasource {
    return new UserDatasourcesImpl()
  }

  async getAll(): Promise<IUser[]> {
    const data = await this.httpClient.get<IAPIUser[]>(API_ROUTES.USERS.GET_ALL)
    return data.map(UserAdapter.toDomain)
  }

  async getByCI(ci: string): Promise<IUser> {
    const data = await this.httpClient.get<IAPIUser>(API_ROUTES.USERS.GET_BY_CI(ci))
    return UserAdapter.toDomain(data)
  }
}
