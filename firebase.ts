import { getApp, getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

import { NotificationDataSourceImpl } from './features/notifications/services/Datasource'
import { IUser } from './features/users/models/IUser'

const firebaseConfig = {
  apiKey: 'AIzaSyCWvzupAokC9YREnP8JIHTNZL44Z1DSQxs',
  authDomain: 'mechanics-schedule.firebaseapp.com',
  projectId: 'mechanics-schedule',
  storageBucket: 'mechanics-schedule.appspot.com',
  messagingSenderId: '195865247278',
  appId: '1:195865247278:web:2a9fbadaad21b0e066a9bf',
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
        vapidKey: `${process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY}`,
      })
      console.log('Token:', token)
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
