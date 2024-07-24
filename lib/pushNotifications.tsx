'use client'

import { UseAccountStore } from '@/features/auth/context/use-account-store'
import { NotificationDataSourceImpl } from '@/features/notifications/services/Datasource'

const publicVapidKey = 'BCrldhzLz9ITO3yFs_G9p1toDacQt53SkXPjzHNiPKdQXwAPDGdg5UJo1R93K2ZmP8oVHgHXc0UNaEsDe38LxXs' || ''

export const subscribeUserToPush = async () => {
  const { user } = UseAccountStore()

  if (typeof window === 'undefined' || !navigator) return

  if (!('serviceWorker' in navigator)) return

  const registration = await navigator.serviceWorker.ready

  if (!registration.pushManager) {
    console.log('Push manager not available')
    return
  }

  try {
    // guardar la subscripción o estado de la subscripción en el store
    const subscription = await registration.pushManager.getSubscription()

    //comprobar el id del usuario y el rol, si coincide con el usuario logeado no se crea, en caso de que no coincida se crea

    // en el logout borrar el estado del role la subscripción

    if (subscription) return

    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    })

    if (!user) return

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
