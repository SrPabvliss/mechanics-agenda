import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { ACCESS_TOKEN_COOKIE_NAME, API_ROUTES } from '@/shared/api/api-routes'
import { setCookie } from '@/shared/api/cookies-util'
import { HttpHandler } from '@/shared/api/http-handler'
import { jwtDecode } from 'jwt-decode'

import { UserAdapter } from '../adapters/UserAdapter'
import { IAPIUser, IDecodedToken } from '../models/IApiUser'
import { IAuth, ILoginResponse } from '../models/IAuth'
import { IUser } from '../models/IUser'

interface UserDatasource {
  login(credentials: IAuth): Promise<IUser>
  logout: () => void
  signup: (user: IUser) => void
  getUserByCi: (ci: string) => Promise<IUser>
}

export class UserDatasourceImpl implements UserDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): UserDatasource {
    return new UserDatasourceImpl()
  }

  async getUserByCi(ci: string) {
    const data = await this.httpClient.get<IAPIUser>(API_ROUTES.USERS.GET_BY_CI(ci))
    return UserAdapter.toDomain(data)
  }

  async login(credentials: IAuth) {
    const { access_token } = await this.httpClient.post<ILoginResponse>(API_ROUTES.AUTH.LOGIN, credentials, {
      successMessage: 'Bienvenido de vuelta!',
    })
    this.httpClient.setAccessToken(access_token)
    setCookie(ACCESS_TOKEN_COOKIE_NAME, access_token)
    const decodedToken: IDecodedToken = jwtDecode(access_token)
    const { sub } = decodedToken
    return this.getUserByCi(sub)
  }

  async logout() {
    await this.httpClient.get(API_ROUTES.AUTH.LOGOUT)
    setCookie(ACCESS_TOKEN_COOKIE_NAME, '')
  }

  async signup(user: IUser) {
    return await this.httpClient.post(API_ROUTES.AUTH.SIGN_UP, user)
  }
}
