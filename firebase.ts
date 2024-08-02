import { getApp, getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

import { NotificationDataSourceImpl } from './features/notifications/services/Datasource'
import { IUser } from './features/users/models/IUser'
import { firebaseConfig } from './shared/constants/firebase-config'

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const messaging = async () => {
  const supported = await isSupported()
  return supported ? getMessaging(app) : null
}

export const fetchToken = async (
  user: IUser,
): Promise<{
  isValid: boolean
  type: 'success' | 'service-worker-not-registered' | 'unsupported' | 'server-error'
}> => {
  const serviceWorker = '/firebase-messaging-sw.js'

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(serviceWorker)
  }

  if (!navigator.serviceWorker.getRegistration(serviceWorker)) {
    return {
      isValid: false,
      type: 'service-worker-not-registered',
    }
  }

  try {
    const fcmMessaging = await messaging()
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: `${process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY}`,
      })
      if (token) {
        const data = await NotificationDataSourceImpl.getInstance().suscribeUser(token, user)
        if (data) {
          return {
            isValid: true,
            type: 'success',
          }
        }
      }
    }
    return {
      isValid: false,
      type: 'server-error',
    }
  } catch (err) {
    return {
      isValid: false,
      type: 'server-error',
    }
  }
}

export const shouldAskPermission = async () => {
  return Notification.permission === 'default'
}
