'use client'

import { NotificationDataSourceImpl } from '@/features/notifications/services/Datasource'
import { IUser } from '@/features/users/models/IUser'
import { fetchToken, messaging } from '@/firebase'
import { onMessage, Unsubscribe } from 'firebase/messaging'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

async function getNotificationPermissionAndToken(user: IUser | null) {
  if (!('Notification' in window)) {
    toast('Las notificaciones no están soportadas en este navegador', { icon: '🔔' })
    return null
  }

  if (!user) {
    toast.error('User not found')
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

const useFcmToken = (user: IUser | null): any => {
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const retryLoadToken = useRef(0)
  const isLoading = useRef(false)
  let unsubscribe: Unsubscribe | null = null

  const loadToken = async () => {
    if (isLoading.current || !user) return

    const settingUp = toast.loading('Activando notificaciones...', { icon: '🔔' })

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
        toast.error('No se pudo activar las notificaciones. Por favor, recarga la página')
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
    toast.dismiss(settingUp)
    setToken(token)
    isLoading.current = false

    const m = await messaging()
    if (!m) return

    unsubscribe = onMessage(m, (payload) => {
      const { title, body } = payload.notification || {}

      const [cliente, asignado, fecha] = body ? body.split(' - ') : ['', '', '']

      const notificationStyles = {
        container: {
          padding: '10px',
          paddingRight: '15px',
          paddingLeft: '15px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        },
        title: {
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '8px',
        },
        item: {
          marginBottom: '6px',
        },
        label: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
      }

      const NotificationContent = () => (
        <div style={notificationStyles.container}>
          <div style={notificationStyles.title}>{title}</div>
          <div style={notificationStyles.item}>
            <span style={notificationStyles.label}>{cliente.split(':')[0]}:</span>
            {cliente.split(':')[1]}
          </div>
          <div style={notificationStyles.item}>
            <span style={notificationStyles.label}>{asignado.split(':')[0]}:</span>
            {asignado.split(':')[1]}
          </div>
          <div style={notificationStyles.item}>
            <span style={notificationStyles.label}>Fecha:</span>
            <span>{new Date(fecha).toLocaleString()}</span>
          </div>
        </div>
      )

      toast(<NotificationContent />, {
        icon: '🔔',
      })
    })
  }

  const cleanup = () => {
    unsubscribe?.()
  }

  return { token, notificationPermissionStatus, enableNotifications: loadToken, cleanup }
}

export default useFcmToken
