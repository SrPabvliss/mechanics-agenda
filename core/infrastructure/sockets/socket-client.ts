'use client'
import { io } from 'socket.io-client'

const APP_SOCKET_ROUTE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost'

export const socketClient = io(APP_SOCKET_ROUTE, {
  transports: ['websocket'],
})

socketClient.on('connect', () => {
  console.log('Socket connected:', socketClient.id)
})

socketClient.on('connect_error', (error) => {
  console.error('Socket connection error:', error)
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
