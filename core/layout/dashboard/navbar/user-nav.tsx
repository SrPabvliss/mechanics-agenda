'use client'

import { useRouter } from 'next/navigation'

import { UseAccountStore } from '@/features/auth/context/use-account-store'
import { spanishUserRole } from '@/shared/constants/spanish-user-role'
import { LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

export function UserNav() {
  const { logout, user, loading } = UseAccountStore()
  const router = useRouter()

  const onLogout = async () => {
    await logout()
    router.push('/login')
  }

  const role = user?.role && user?.role in spanishUserRole ? spanishUserRole[user.role] : ''

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    {`${user?.firstName?.[0]}${user?.lastName?.[0]}`.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Perfil</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="text-xs leading-none text-muted-foreground">{role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer">
          <Button disabled={loading} variant={'ghost'} className="flex items-center" onClick={() => onLogout()}>
            {loading ? (
              <LoadingSpinner className="text-center" />
            ) : (
              <>
                <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
                Cerrar sesión
              </>
            )}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
