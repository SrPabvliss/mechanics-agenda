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
  useEffect(
    () => {
      joinChannel(SOCKET_CHANNEL.MECHANICS)

      const handleNewAppointment = () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QUOTES] })
      }

      socketClient.on('appointments-change', handleNewAppointment)

      return () => {
        leaveChannel(SOCKET_CHANNEL.MECHANICS)
        socketClient.off('appointments-change', handleNewAppointment)
      }
    },
    [
      // queryClient
    ],
  )

  return <QuotesContext.Provider value={null}>{children}</QuotesContext.Provider>
}

export default QuotesProvider
