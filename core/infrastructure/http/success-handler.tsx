import { notificationStyles } from '@/shared/constants/notification-styles'
import React from 'react'
import toast from 'react-hot-toast'

interface SuccessToastProps {
  message: string
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message }) => {
  return (
    <div style={notificationStyles.container}>
      <div style={notificationStyles.title}>¡Éxito!</div>
      <div style={notificationStyles.item}>{message}</div>
    </div>
  )
}

export const showSuccessToast = (message: string) => {
  toast.success((t) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SuccessToast message={message} />
      <button onClick={() => toast.dismiss(t.id)} style={notificationStyles.button}>
        Descartar
      </button>
    </div>
  ))
}

export default SuccessToast
