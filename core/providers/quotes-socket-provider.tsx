import { QUERY_KEY } from '@/shared/api/query-key'
import React, { createContext, useContext, useEffect } from 'react'

import queryClient from '../infrastructure/react-query/query-client'
import { joinChannel, leaveChannel, SOCKET_CHANNEL, socketClient } from '../infrastructure/sockets/socket-client'

interface Props {
  children: React.ReactNode
}

const QuotesContext = createContext(null)

export const useQuotes = () => useContext(QuotesContext)

const QuotesProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    joinChannel(SOCKET_CHANNEL.MECHANICS)

    const handleNewAppointment = () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QUOTES] })
      showNotification('Nuevo evento creado', 'Se ha creado una nueva cita.')
    }

    const handleInspectionChange = () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS] })
      showNotification('Cambio en inspección', 'Una inspección ha cambiado.')
    }

    const handleJobChange = () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.JOBS] })
      showNotification('Cambio en trabajo', 'Un trabajo ha cambiado.')
    }

    socketClient.on('appointments-change', handleNewAppointment)
    socketClient.on('jobs-change', handleJobChange)
    socketClient.on('inspections-change', handleInspectionChange)

    return () => {
      leaveChannel(SOCKET_CHANNEL.MECHANICS)
      socketClient.off('appointments-change', handleNewAppointment)
      socketClient.off('jobs-change', handleJobChange)
      socketClient.off('inspections-change', handleInspectionChange)
    }
  }, [])

  const showNotification = (title: any, body: any) => {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active?.postMessage({
          type: 'PUSH_NOTIFICATION',
          payload: {
            title,
            body,
            icon: './logo.png',
            url: '/some-url',
          },
        })
      })
    }
  }

  return <QuotesContext.Provider value={null}>{children}</QuotesContext.Provider>
}

export default QuotesProvider
