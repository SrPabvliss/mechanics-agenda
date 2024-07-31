import { getApp, getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDtsbkDutJZrEGMMJUcJ6jXHlqbEnW8ouw',
  authDomain: 'schedule-gab-motors-test.firebaseapp.com',
  projectId: 'schedule-gab-motors-test',
  storageBucket: 'schedule-gab-motors-test.appspot.com',
  messagingSenderId: '851887950403',
  appId: '1:851887950403:web:0232362278f9acbed5a2f6',
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const messaging = async () => {
  const supported = await isSupported()
  return supported ? getMessaging(app) : null
}

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging()
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`,
      })
      return token
    }
    return null
  } catch (err) {
    console.error('An error occurred while fetching the token:', err)
    return null
  }
}
