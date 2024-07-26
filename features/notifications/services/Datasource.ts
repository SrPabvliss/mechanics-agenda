import { AxiosAdapter } from '@/core/infrastructure/http/axios-adapter'
import { IUser } from '@/features/auth/models/IUser'
import { API_ROUTES, PUSH_NOTIFICATIONS_IDENTIFIER } from '@/shared/api/api-routes'
import { setObjectInCookie } from '@/shared/api/cookies-util'
import { HttpHandler } from '@/shared/api/http-handler'

import { ISubscription } from '../models/ISubscription'

interface NotificationDatasource {
  suscribeUser: (subscription: PushSubscription, user: IUser) => Promise<ISubscription | undefined>
  updateSubscription: (susbscription: ISubscription) => Promise<ISubscription | undefined>
}

export class NotificationDataSourceImpl implements NotificationDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosAdapter.getInstance()
  }

  static getInstance(): NotificationDatasource {
    return new NotificationDataSourceImpl()
  }

  async suscribeUser(subscription: PushSubscription, user: IUser) {
    const { ci } = user
    const objectSubscription = {
      subscription,
      userCI: ci,
    }

    const { data, error } = await this.httpClient.post<ISubscription>(
      API_ROUTES.NOTIFICATIONS.SUBSCRIBE,
      objectSubscription,
      {
        successMessage: 'Notificaciones activadas',
      },
    )

    if (error || !data) return

    setObjectInCookie(PUSH_NOTIFICATIONS_IDENTIFIER, data)

    return data
  }

  async updateSubscription(subscription: ISubscription) {
    const { id, available, userCI } = subscription

    const { data, error } = await this.httpClient.patch<ISubscription>(
      API_ROUTES.NOTIFICATIONS.UPDATE_SUBSCRIPTION(id),
      {
        available: !available,
        userCI,
      },
      {
        successMessage: 'Notificaciones actualizadas',
      },
    )

    if (error || !data) return

    setObjectInCookie(PUSH_NOTIFICATIONS_IDENTIFIER, data)

    return data
  }
}
