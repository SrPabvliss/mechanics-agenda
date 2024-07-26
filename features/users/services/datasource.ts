import { AxiosAdapter } from '@/core/infrastructure/http/axios-adapter'
import { API_ROUTES } from '@/shared/api/api-routes'
import { HttpHandler } from '@/shared/api/http-handler'

import { UserAdapter } from '../adapters/UserAdapter'
import { IAPIUser } from '../models/IApiUser'
import { IUser } from '../models/IUser'

export interface UserDatasource {
  getAll(): Promise<IUser[] | undefined>
  getByCI(ci: string): Promise<IUser | undefined>
}

export class UserDatasourcesImpl implements UserDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosAdapter.getInstance()
  }

  static getInstance(): UserDatasource {
    return new UserDatasourcesImpl()
  }

  async getAll() {
    const { data, error } = await this.httpClient.get<IAPIUser[]>(API_ROUTES.USERS.GET_ALL)
    if (error) return []
    return data!.map((user) => UserAdapter.toDomain(user))
  }

  async getByCI(ci: string) {
    const { data, error } = await this.httpClient.get<IAPIUser>(API_ROUTES.USERS.GET_BY_CI(ci))
    if (error) return
    return UserAdapter.toDomain(data!)
  }
}
