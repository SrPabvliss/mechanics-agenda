import { AuthDatasourceImpl } from '@/features/auth/services/Datasource'
import { HTTP_STATUS_CODES } from '@/shared/api/http-status-codes'
import { MESSAGES } from '@/shared/constants/messages'
import { notificationStyles } from '@/shared/constants/notification-styles'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const ErrorToast: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div style={notificationStyles.container}>
      <div style={notificationStyles.title}>¡Error!</div>
      <div style={notificationStyles.item}>{message}</div>
    </div>
  )
}

export const showErrorToast = (message: string) => {
  toast.error((t) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorToast message={message} />
      <button onClick={() => toast.dismiss(t.id)} style={notificationStyles.button}>
        Descartar
      </button>
    </div>
  ))
}

function handleNetworkError(error: AxiosError): void {
  if (error.message === 'Network Error') {
    showErrorToast(MESSAGES.CONNECTION_FAILED)
    return
  }
  showErrorToast(error.message)
}

async function handleResponseError(error: AxiosError): Promise<void> {
  const { status, data } = error.response!

  if (status === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
    showErrorToast(MESSAGES.INTERNAL_SERVER_ERROR)
    return
  }

  if (status === HTTP_STATUS_CODES.FORBIDDEN && typeof window !== 'undefined') {
    window.location.href = '/login'
    return
  }

  if (status === HTTP_STATUS_CODES.UNAUTHORIZED) {
    showErrorToast(MESSAGES.AUTH.UNAUTHORIZED)
    await AuthDatasourceImpl.getInstance().logout()
    window.location.href = '/login'
    return
  }

  showErrorToast(`${(data as any)?.message || error.message}`)
}

export function handleError(error: AxiosError): void {
  if (!error.response) {
    handleNetworkError(error)
    return
  }
  handleResponseError(error)
}
