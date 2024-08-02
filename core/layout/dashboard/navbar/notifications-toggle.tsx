import { UseAccountStore } from '@/features/auth/context/use-account-store'
import ConfirmationDialog from '@/shared/components/confirmation-dialog'
import useFcmToken from '@/shared/hooks/use-fcm-token'
import { Bell } from 'lucide-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

export function NotificationToggle() {
  const { user } = UseAccountStore()
  const { enableNotifications, cleanup } = useFcmToken(user!)

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  const handleEnableNotifications = async () => {
    if (!user) {
      toast.error('User not found')
      return
    }
    await enableNotifications()
  }

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <ConfirmationDialog
            onConfirm={handleEnableNotifications}
            title="Habilitar notificaciones"
            description="¿Estás seguro que deseas habilitar las notificaciones?"
            triggerLabel={<Bell height={20} width={20} />}
            confirmLabel="Habilitar"
            cancelLabel="Cancelar"
            size={'icon'}
            variant={'outline'}
            roundedFull
          />
        </TooltipTrigger>
        <TooltipContent>Enable Notifications</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
