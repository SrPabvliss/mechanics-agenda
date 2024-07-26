import { AxiosAdapter } from '@/core/infrastructure/http/axios-adapter'
import { ACCESS_TOKEN_COOKIE_NAME, API_ROUTES } from '@/shared/api/api-routes'
import { deleteCookie, setCookie } from '@/shared/api/cookies-util'
import { HttpHandler } from '@/shared/api/http-handler'
import { MESSAGES } from '@/shared/constants/messages'
import { jwtDecode } from 'jwt-decode'

import { UserAdapter } from '../adapters/UserAdapter'
import { IAPIUser, IDecodedToken } from '../models/IApiUser'
import { IAuth, ILoginResponse, IValidate } from '../models/IAuth'
import { IUser } from '../models/IUser'

interface UserDatasource {
  login(credentials: IAuth): Promise<IUser | undefined>
  logout: () => void
  signup: (user: IUser) => void
  getUserByCi: (ci: string) => Promise<IUser | undefined>
  validateToken: () => Promise<boolean>
}

export class UserDatasourceImpl implements UserDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosAdapter.getInstance()
  }

  static getInstance(): UserDatasource {
    return new UserDatasourceImpl()
  }

  async getUserByCi(ci: string) {
    const { data, error } = await this.httpClient.get<IAPIUser>(API_ROUTES.USERS.GET_BY_CI(ci))
    if (error) return
    return UserAdapter.toDomain(data!)
  }

  async login(credentials: IAuth) {
    const { data, error } = await this.httpClient.post<ILoginResponse>(API_ROUTES.AUTH.LOGIN, credentials, {
      successMessage: MESSAGES.AUTH.LOGIN,
    })
    if (error) return
    const { access_token } = data!
    this.httpClient.setAccessToken(access_token)
    setCookie(ACCESS_TOKEN_COOKIE_NAME, access_token)
    const decodedToken: IDecodedToken = jwtDecode(access_token)
    const { sub } = decodedToken
    return this.getUserByCi(sub)
  }

  async logout() {
    const { error } = await this.httpClient.get(API_ROUTES.AUTH.LOGOUT)
    if (error) return
    await this.httpClient.setAccessToken(null)
    await deleteCookie(ACCESS_TOKEN_COOKIE_NAME)
  }

  async signup(user: IUser) {
    return await this.httpClient.post(API_ROUTES.AUTH.SIGN_UP, user)
  }

  async validateToken() {
    const { data, error } = await this.httpClient.get<IValidate>(API_ROUTES.AUTH.VALIDATE_TOKEN)
    if (error) return false
    return data!.isValid
  }
}
