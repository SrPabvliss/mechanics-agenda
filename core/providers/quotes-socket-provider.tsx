// import { useQueryClient } from '@tanstack/react-query'
import { IQuoteEvent } from '@/shared/interfaces/IEvents'
import React, { createContext, useContext, useEffect } from 'react'

import { joinChannel, leaveChannel, SOCKET_CHANNEL, socketClient } from '../infrastructure/sockets/socket-client'

interface Props {
  children: React.ReactNode
}

const QuotesContext = createContext(null)

export const useQuotes = () => useContext(QuotesContext)

const QuotesProvider: React.FC<Props> = ({ children }) => {
  // const queryClient = useQueryClient()

  useEffect(
    () => {
      joinChannel(SOCKET_CHANNEL.MECHANICS)

      const handleNewAppointment = (data: IQuoteEvent | null) => {
        if (data) {
          // queryClient.invalidateQueries(['quotes'])
          // esto es lo que se debería hacer para actualizar la lista de citas
        }
        console.log('new-appointment', data)
      }

      socketClient.on('new-appointment', handleNewAppointment)

      return () => {
        leaveChannel(SOCKET_CHANNEL.MECHANICS)
        socketClient.off('new-appointment', handleNewAppointment)
      }
    },
    [
      // queryClient
    ],
  )

  return <QuotesContext.Provider value={null}>{children}</QuotesContext.Provider>
}

export default QuotesProvider
