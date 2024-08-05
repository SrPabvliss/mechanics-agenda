'use client'

import { showErrorToast } from '@/core/infrastructure/http/error-handler'
import { NotificationDataSourceImpl } from '@/features/notifications/services/Datasource'
import { IUser } from '@/features/users/models/IUser'
import { fetchToken, messaging } from '@/firebase'
import { onMessage, Unsubscribe } from 'firebase/messaging'
import { useRef, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { notificationStyles } from '../constants/notification-styles'
import useNotificationContent from './use-notification-content'

async function getNotificationPermissionAndToken(user: IUser | null) {
  if (!('Notification' in window)) {
    toast('Las notificaciones no están soportadas en este navegador', { icon: '🔔' })
    return null
  }

  if (!user) {
    showErrorToast('User not found')
    return null
  }

  if (Notification.permission === 'granted') return await fetchToken()

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') return await fetchToken()
  }

  toast('Por favor, activa las notificaciones para recibir alertas', { icon: '🔔' })
  return null
}

const useFcmToken = (user: IUser | null) => {
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const retryLoadToken = useRef(0)
  const isLoading = useRef(false)

  const loadToken = async () => {
    if (isLoading.current || !user) return

    isLoading.current = true
    const token = await getNotificationPermissionAndToken(user)

    if (Notification.permission === 'denied') {
      setNotificationPermissionStatus('denied')
      toast('Las notificaciones están desactivadas. Activa las notificaciones para recibir alertas', { icon: '🔔' })
      isLoading.current = false
      return
    }

    if (!token) {
      if (retryLoadToken.current >= 3) {
        showErrorToast('No se pudo activar las notificaciones. Por favor, recarga la página')
        isLoading.current = false
        return
      }

      retryLoadToken.current += 1
      isLoading.current = false
      await loadToken()
      return
    }

    setNotificationPermissionStatus(Notification.permission)
    await NotificationDataSourceImpl.getInstance().suscribeUser(token, user)
    setToken(token)
    isLoading.current = false
  }

  return { token, notificationPermissionStatus, loadToken }
}

const useNotificationListener = (user: IUser | null) => {
  const unsubscribe = useRef<Unsubscribe | null>(null)

  useEffect(() => {
    const setupListener = async () => {
      if (!user) return

      const m = await messaging()
      if (!m) return

      unsubscribe.current = onMessage(m, (payload) => {
        const { title = '', body = '' } = payload.notification || {}

        const NotificationContent = useNotificationContent(title, body)

        toast(
          (t) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <NotificationContent />
              <button onClick={() => toast.dismiss(t.id)} style={notificationStyles.button}>
                Descartar
              </button>
            </div>
          ),
          {
            icon: '🔔',
          },
        )
      })
    }

    setupListener()

    return () => {
      unsubscribe.current?.()
    }
  }, [user])

  return unsubscribe
}

export { useFcmToken, useNotificationListener }
