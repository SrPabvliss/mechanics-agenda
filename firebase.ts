import { getApp, getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

import { NotificationDataSourceImpl } from './features/notifications/services/Datasource'
import { IUser } from './features/users/models/IUser'

const firebaseConfig = {
  apiKey: 'AIzaSyBOmV1DVRRbDD037cGwGGpaUVsdn1hm-AQ',
  authDomain: 'push-test-87cdb.firebaseapp.com',
  projectId: 'push-test-87cdb',
  storageBucket: 'push-test-87cdb.appspot.com',
  messagingSenderId: '80244541010',
  appId: '1:80244541010:web:bd8d0e96641d185acf018b',
}
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const messaging = async () => {
  const supported = await isSupported()
  return supported ? getMessaging(app) : null
}

export const fetchToken = async (user: IUser) => {
  try {
    const fcmMessaging = await messaging()
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`,
      })
      if (token) {
        const data = await NotificationDataSourceImpl.getInstance().suscribeUser(token, user)
        if (data) {
          return token
        }
      }
    }
    return null
  } catch (err) {
    console.error('An error occurred while fetching the token:', err)
    return null
  }
}

export const shouldAskPermission = async () => {
  return Notification.permission === 'default'
}
