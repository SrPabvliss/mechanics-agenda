// import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '@/shared/api/query-key'
import React, { createContext, useContext, useEffect } from 'react'

import queryClient from '../infrastructure/react-query/query-client'
import { joinChannel, leaveChannel, SOCKET_CHANNEL, socketClient } from '../infrastructure/sockets/socket-client'

interface Props {
  children: React.ReactNode
}

const AdminQuotesContext = createContext(null)

export const useAdminQuotes = () => useContext(AdminQuotesContext)

const AdminQuotesProvider: React.FC<Props> = ({ children }) => {
  useEffect(
    () => {
      joinChannel(SOCKET_CHANNEL.ADMINS)

      const handleNewReminder = () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REMINDERS] })
      }

      socketClient.on('reminders-change', handleNewReminder)

      return () => {
        leaveChannel(SOCKET_CHANNEL.ADMINS)
        socketClient.off('reminders-change', handleNewReminder)
      }
    },
    [
      // queryClient
    ],
  )

  return <AdminQuotesContext.Provider value={null}>{children}</AdminQuotesContext.Provider>
}

export default AdminQuotesProvider
