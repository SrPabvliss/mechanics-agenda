import { getApp, getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

import { firebaseConfig } from './shared/constants/firebase-config'

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const messaging = async () => {
  const supported = await isSupported()
  return supported ? getMessaging(app) : null
}

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging()
    if (!fcmMessaging) return null
    const token = await getToken(fcmMessaging, {
      vapidKey: `${process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY}`,
    })
    return token ? token : null
  } catch (err) {
    return null
  }
}

export const shouldAskPermission = async () => {
  return Notification.permission === 'default'
}
