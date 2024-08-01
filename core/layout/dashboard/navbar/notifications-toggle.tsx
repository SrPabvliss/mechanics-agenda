import { UseAccountStore } from '@/features/auth/context/use-account-store'
import { fetchToken, shouldAskPermission } from '@/firebase'
import { Bell } from 'lucide-react'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

export function NotificationToggle() {
  const [isPermissionGranted, setPermissionState] = useState(false)
  const { user } = UseAccountStore()

  const checkPermission = async () => {
    const shouldAsk = await shouldAskPermission()
    setPermissionState(shouldAsk)
  }

  useEffect(() => {
    checkPermission()
  }, [])

  const enableNotifications = async () => {
    if (!user) {
      console.error('User not found')
      return
    }
    const token = await fetchToken(user)
    if (token) setPermissionState(false)
  }

  if (!isPermissionGranted) {
    return null
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
