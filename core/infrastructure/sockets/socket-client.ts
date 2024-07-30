'use client'
import { io, Socket } from 'socket.io-client'

const APP_SOCKET_ROUTE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost'

export const socketClient: Socket = io(APP_SOCKET_ROUTE, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 10000,
  reconnectionDelayMax: 60000,
  randomizationFactor: 0.5,
})

socketClient.on('connect', () => {
  console.log('Socket connected:', socketClient.id)
})

socketClient.on('connect_error', (error) => {
  console.error('Socket connection error:', error)
})

socketClient.on('reconnect_attempt', (attemptNumber) => {
  console.log(`Reconnection attempt #${attemptNumber}`)
})

socketClient.on('reconnect_failed', () => {
  console.error('Reconnection failed after maximum attempts')
})

export enum SOCKET_CHANNEL {
  ADMINS = 'joinAdminsRoom',
  MECHANICS = 'joinMechanicsRoom',
}

export const joinChannel = (channel: SOCKET_CHANNEL) => {
  socketClient.emit(channel)
}

export const leaveChannel = (channel: SOCKET_CHANNEL) => {
  socketClient.emit('leave', channel)
}
