import { usePathname, useRouter } from 'next/navigation'

import getEventDetailsComponent from '@/shared/hooks/use-details-factory'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { IEvent } from '@/shared/interfaces/IEvents'
import { DialogDescription } from '@radix-ui/react-dialog'
import React from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerTrigger } from '@/components/ui/drawer'

interface DetailsDialogProps {
  item: IEvent
  onDelete?: (id: number) => void
  children: React.ReactNode
}

export const DetailsDialog: React.FC<DetailsDialogProps> = ({ item, children, onDelete }) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const router = useRouter()
  const pathname = usePathname()

  const eventDetailsComponent = getEventDetailsComponent(item, {
    onClose: () => setOpen(false),
    onEdit: (id: number) => router.push(`${pathname}/edit/${id}`),
    onDelete: onDelete,
  })

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="w-full cursor-pointer">
          <div className="w-full">{children}</div>
        </DialogTrigger>
        <DialogDescription className="hidden">Descripción del evento</DialogDescription>
        <DialogContent className="sm:max-w-[425px]">
          <div className="px-1">{eventDetailsComponent}</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="w-full">
        <div className="w-full">{children}</div>
      </DrawerTrigger>
      <DrawerDescription className="hidden">Descripción del evento</DrawerDescription>
      <DrawerContent className="px-6">
        <div className="px-4 pb-6">{eventDetailsComponent}</div>
      </DrawerContent>
    </Drawer>
  )
}
