import { AuthDatasourceImpl } from '@/features/auth/services/Datasource'
import { HTTP_STATUS_CODES } from '@/shared/api/http-status-codes'
import { MESSAGES } from '@/shared/constants/messages'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

function handleNetworkError(error: AxiosError): void {
  if (error.message === 'Network Error') {
    toast.error(MESSAGES.CONNECTION_FAILED)
    return
  }
  toast.error(`Error: ${error.message}`)
}

async function handleResponseError(error: AxiosError): Promise<void> {
  const { status, data } = error.response!

  if (status === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
    toast.error(MESSAGES.INTERNAL_SERVER_ERROR)
    return
  }

  if (status === HTTP_STATUS_CODES.FORBIDDEN && typeof window !== 'undefined') {
    window.location.href = '/dashboard'
    return
  }

  if (status === HTTP_STATUS_CODES.UNAUTHORIZED) {
    toast.error(MESSAGES.AUTH.UNAUTHORIZED)
    await AuthDatasourceImpl.getInstance().logout()
    window.location.href = '/login'
    return
  }

  toast.error(`${(data as any)?.message || error.message}`)
}

export function handleError(error: AxiosError): void {
  if (!error.response) {
    handleNetworkError(error)
    return
  }
  handleResponseError(error)
}
