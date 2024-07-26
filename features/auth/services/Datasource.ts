import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { IUser } from '@/features/users/models/IUser'
import { UserDatasourcesImpl } from '@/features/users/services/datasource'
import { ACCESS_TOKEN_COOKIE_NAME, API_ROUTES } from '@/shared/api/api-routes'
import { deleteCookie, setCookie } from '@/shared/api/cookies-util'
import { HttpHandler } from '@/shared/api/http-handler'
import { MESSAGES } from '@/shared/constants/messages'
import { jwtDecode } from 'jwt-decode'

import { IAuth, ILoginResponse, IValidate } from '../models/IAuth'
import { IDecodedToken } from '../models/IDecodedToken'

interface AuthDatasource {
  login(credentials: IAuth): Promise<IUser>
  logout: () => Promise<void>
  signup: (user: IUser) => void
  validateToken: () => Promise<boolean>
}

export class AuthDatasourceImpl implements AuthDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): AuthDatasource {
    return new AuthDatasourceImpl()
  }

  async login(credentials: IAuth) {
    const { access_token } = await this.httpClient.post<ILoginResponse>(API_ROUTES.AUTH.LOGIN, credentials, {
      successMessage: MESSAGES.AUTH.LOGIN,
    })
    this.httpClient.setAccessToken(access_token)
    setCookie(ACCESS_TOKEN_COOKIE_NAME, access_token)
    const decodedToken: IDecodedToken = jwtDecode(access_token)
    const { sub } = decodedToken
    return UserDatasourcesImpl.getInstance().getByCI(sub)
  }

  async logout() {
    await this.httpClient.get(API_ROUTES.AUTH.LOGOUT)
    AxiosClient.getInstance().setAccessToken(null)
    deleteCookie(ACCESS_TOKEN_COOKIE_NAME)
  }

  async signup(user: IUser) {
    return await this.httpClient.post(API_ROUTES.AUTH.SIGN_UP, user)
  }

  async validateToken() {
    const { isValid } = await this.httpClient.get<IValidate>(API_ROUTES.AUTH.VALIDATE_TOKEN)
    return isValid
  }
}
