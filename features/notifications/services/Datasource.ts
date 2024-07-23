import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { UserRole } from '@/features/auth/models/IApiUser'
import { API_ROUTES } from '@/shared/api/api-routes'
import { HttpHandler } from '@/shared/api/http-handler'

interface NotificationDatasource {
  suscribeUser: (subscription: PushSubscription, userRole: UserRole) => void
}

export class NotificationDataSourceImpl implements NotificationDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): NotificationDatasource {
    return new NotificationDataSourceImpl()
  }

  async suscribeUser(subscription: PushSubscription, userRole: UserRole) {
    console.log('subscription', subscription)

    const objectSubscription = {
      subscription,
      userRole,
    }

    const dest = { ...(subscription as object) }

    console.log('objectSubscription', dest)
    return await this.httpClient.post(API_ROUTES.NOTIFICATIONS.SUBSCRIBE, objectSubscription)
  }
}
