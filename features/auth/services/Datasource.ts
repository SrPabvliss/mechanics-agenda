import { AxiosAdapter } from '@/core/infrastructure/http/axios-adapter'
import { IUser } from '@/features/users/models/IUser'
import { ACCESS_TOKEN_COOKIE_NAME, API_ROUTES } from '@/shared/api/api-routes'
import { deleteCookie, setCookie } from '@/shared/api/cookies-util'
import { HttpHandler } from '@/shared/api/http-handler'
import { MESSAGES } from '@/shared/constants/messages'
import { deleteToken, getMessaging } from 'firebase/messaging'
import { jwtDecode } from 'jwt-decode'

import { IAuth, ILoginResponse, IValidate } from '../models/IAuth'
import { IDecodedToken } from '../models/IDecodedToken'

interface AuthDatasource {
  login(credentials: IAuth): Promise<IUser | undefined>
  logout: () => Promise<boolean>
  signup: (user: IUser) => void
  validateToken: () => Promise<boolean>
}

export class AuthDatasourceImpl implements AuthDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosAdapter.getInstance()
  }

  static getInstance(): AuthDatasource {
    return new AuthDatasourceImpl()
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
    const { sub, firstName, lastName, role } = decodedToken
    const user: IUser = { ci: sub, firstName, lastName, role }
    return user
  }

  async logout() {
    const { error } = await this.httpClient.get(API_ROUTES.AUTH.LOGOUT)
    if (error) return false
    await this.httpClient.setAccessToken(null)
    await deleteCookie(ACCESS_TOKEN_COOKIE_NAME)
    try {
      const messaging = getMessaging()
      await deleteToken(messaging)
    } catch (error) {
      console.error('Error deleting token')
    }
    return true
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
