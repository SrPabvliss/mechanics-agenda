import { socketClient } from '@/core/infrastructure/sockets/socket-client'
import { IQuoteEvent } from '@/shared/interfaces/IEvents'
import { useEffect } from 'react'

export const useAdminQListener = () => {
  useEffect(() => {
    // check if the socket is already subscribed to the event
    const handleNewReminder = (data: IQuoteEvent) => {
      console.log('new-reminder', data)
    }

    socketClient.on('new-reminder', handleNewReminder)

    return () => {
      socketClient.off('new-reminder', handleNewReminder)
    }
  }, [])
}
