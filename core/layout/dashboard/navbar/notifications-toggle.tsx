import { UseAccountStore } from '@/features/auth/context/use-account-store'
import { ISubscription } from '@/features/notifications/models/ISubscription'
import { PUSH_NOTIFICATIONS_IDENTIFIER } from '@/shared/api/api-routes'
import { getObjectFromCookie } from '@/shared/api/cookies-util'
import { Bell } from 'lucide-react'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

import { handleUserSubscription } from '@/lib/pushNotifications'

export function NotificationToggle() {
  const { user } = UseAccountStore()
  const [isRed, setIsRed] = useState(true)

  useEffect(() => {
    const fetchCookieData = async () => {
      const cookieData: ISubscription = await getObjectFromCookie(PUSH_NOTIFICATIONS_IDENTIFIER)
      if (cookieData) {
        setIsRed(!cookieData.available)
      }
    }
    fetchCookieData()
  }, [])

  const toggleColor = async () => {
    setIsRed(!isRed)
    await handleUserSubscription(user as any)
  }

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="h-8 w-auto rounded-full bg-background px-2"
            variant={'outline'}
            size={'sm'}
            onClick={toggleColor}
          >
            <div className="flex items-center gap-1">
              <Bell className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100" />
              <div className={`mx-1 h-2 w-2 rounded-full ${isRed ? 'bg-red-500' : 'bg-green-500'}`} />
            </div>
            <span className="sr-only">Recibir notificaciones</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Recibir notificaciones</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
