// import { useQueryClient } from '@tanstack/react-query'
import { IAdminQuoteEvent } from '@/shared/interfaces/IEvents'
import React, { createContext, useContext, useEffect } from 'react'

import { joinChannel, leaveChannel, SOCKET_CHANNEL, socketClient } from '../infrastructure/sockets/socket-client'

interface Props {
  children: React.ReactNode
}

const AdminQuotesContext = createContext(null)

export const useAdminQuotes = () => useContext(AdminQuotesContext)

const AdminQuotesProvider: React.FC<Props> = ({ children }) => {
  // const queryClient = useQueryClient()

  useEffect(
    () => {
      joinChannel(SOCKET_CHANNEL.ADMINS)

      const handleNewReminder = (data: IAdminQuoteEvent | null) => {
        if (data) {
          // queryClient.invalidateQueries(['admin-quotes'])
          // esto es lo que se debería hacer para actualizar la lista de citas administrativas
        }
        console.log('new-reminder', data)
      }

      socketClient.on('new-reminder', handleNewReminder)

      return () => {
        leaveChannel(SOCKET_CHANNEL.ADMINS)
        socketClient.off('new-reminder', handleNewReminder)
      }
    },
    [
      // queryClient
    ],
  )

  return <AdminQuotesContext.Provider value={null}>{children}</AdminQuotesContext.Provider>
}

export default AdminQuotesProvider
