'use client'

import { IUser } from '@/features/auth/models/IUser'
import { ISubscription } from '@/features/notifications/models/ISubscription'
import { NotificationDataSourceImpl } from '@/features/notifications/services/Datasource'
import { PUSH_NOTIFICATIONS_IDENTIFIER } from '@/shared/api/api-routes'
import { getObjectFromCookie } from '@/shared/api/cookies-util'

const publicVapidKey = 'BCrldhzLz9ITO3yFs_G9p1toDacQt53SkXPjzHNiPKdQXwAPDGdg5UJo1R93K2ZmP8oVHgHXc0UNaEsDe38LxXs' || ''

export const handleUserSubscription = async (user: IUser) => {
  console.log('handleUserSubscription')
  if (typeof window === 'undefined' || !navigator) return

  if (!('serviceWorker' in navigator)) return

  const permission = await Notification.requestPermission()
  console.log(permission)
  if (permission !== 'granted') {
    console.error('Permiso de notificación no concedido')
    return
  }

  const registration = await navigator.serviceWorker.ready

  if (!registration.pushManager) {
    console.error('Push manager unavailable')
    return
  }

  if (!user) return

  try {
    const subscription: ISubscription | undefined = await getObjectFromCookie(PUSH_NOTIFICATIONS_IDENTIFIER)

    if (subscription) {
      NotificationDataSourceImpl.getInstance().updateSubscription(subscription)
      return
    }

    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    })

    NotificationDataSourceImpl.getInstance().suscribeUser(newSubscription, user)
  } catch (error) {
    console.error('Failed to subscribe the user: ', error)
  }
}

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}
