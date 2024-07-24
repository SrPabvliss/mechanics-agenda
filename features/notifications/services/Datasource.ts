import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { UserRole } from '@/features/auth/models/IApiUser'
import { IUser } from '@/features/auth/models/IUser'
import { API_ROUTES, PUSH_NOTIFICATIONS_IDENTIFIER } from '@/shared/api/api-routes'
import { setObjectInCookie } from '@/shared/api/cookies-util'
import { HttpHandler } from '@/shared/api/http-handler'

import { encrypt } from '@/lib/encryption-utils'

interface NotificationDatasource {
  suscribeUser: (subscription: PushSubscription, user: IUser) => void
  unsuscribeUser: (subscription: PushSubscription) => void
  registerEndpoint: (endpoint: string, ci: string, role: UserRole) => void
}

export class NotificationDataSourceImpl implements NotificationDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): NotificationDatasource {
    return new NotificationDataSourceImpl()
  }

  async suscribeUser(subscription: PushSubscription, user: IUser) {
    const { endpoint } = subscription
    const { role, ci } = user
    const objectSubscription = {
      subscription,
      userRole: role,
    }

    const data = await this.httpClient.post(API_ROUTES.NOTIFICATIONS.SUBSCRIBE, objectSubscription, {
      successMessage: 'Notificaciones activadas',
    })

    if (data) this.registerEndpoint(endpoint, ci, role)
  }

  async unsuscribeUser(subscription: PushSubscription) {
    const { endpoint } = subscription

    return await this.httpClient.delete(API_ROUTES.NOTIFICATIONS.UNSUBSCRIBE, { endpoint })
  }

  async registerEndpoint(endpoint: string, ci: string, role: UserRole) {
    const objectEndpoint = {
      endpoint: await encrypt(endpoint),
      ci,
      role,
    }
    setObjectInCookie(PUSH_NOTIFICATIONS_IDENTIFIER, objectEndpoint)
  }
}
