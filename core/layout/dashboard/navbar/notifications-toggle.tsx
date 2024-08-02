import { UseAccountStore } from '@/features/auth/context/use-account-store'
import { fetchToken } from '@/firebase'
import { Bell } from 'lucide-react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

export function NotificationToggle() {
  const { user } = UseAccountStore()
  const enableNotifications = async () => {
    if (!user) {
      console.error('User not found')
      return
    }
    const { isValid, type } = await fetchToken(user)
    if (!isValid && type === 'service-worker-not-registered') {
      toast.error('Error al registrarte. Recarga la página e intenta de nuevo')
    }
  }

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="h-8 w-auto rounded-full bg-background px-2"
            variant={'outline'}
            size={'sm'}
            onClick={enableNotifications}
          >
            <Bell height={20} width={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Enable Notifications</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
