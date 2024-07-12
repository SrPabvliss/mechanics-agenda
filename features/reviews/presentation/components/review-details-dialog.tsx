import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { IEvent } from '@/shared/interfaces/IEvents'
import { Clock, User } from 'lucide-react'
import * as React from 'react'

import { AutosizeTextarea } from '@/components/ui/autosize-textarea'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface ReviewDetailsDialogProps {
  item: IEvent
  children: React.ReactNode
}

export const ReviewDetailsDialog: React.FC<ReviewDetailsDialogProps> = ({ item, children }) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const dialogContent = (
    <>
      <div className="mt-1 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-1  gap-2">
            <User size={24} />
            <p>{item.owner}</p>
          </div>
          <div className="flex flex-1  gap-2">
            <Clock size={24} />
            <p>{item.startTime}</p>
          </div>
        </div>
        <AutosizeTextarea value={item.description} disabled />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Regresar
          </Button>
          <Button>Acceder a la Revisión</Button>
        </div>
      </div>
    </>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>{children}</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <div
                className={`flex ${item.title.length > 15 ? 'flex-col justify-center' : 'flex-row '}  items-center gap-2 md:flex-row md:gap-6`}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                <Badge variant="outline" className="flex w-1/4 justify-center p-2">
                  {item.label}
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className={`inline-block h-2 w-full rounded-full ${item.color}`}></div>
            </DialogDescription>
          </DialogHeader>
          <div className="px-1">{dialogContent}</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>{children}</div>
      </DrawerTrigger>
      <DrawerContent className="px-6">
        <DrawerHeader className="text-left">
          <DrawerTitle>
            <div
              className={`flex ${item.title.length > 15 ? 'flex-col justify-center' : 'flex-row '}  items-center gap-4 md:flex-row md:gap-6`}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
              <Badge variant="outline" className="flex w-1/4 justify-center p-2">
                {item.label}
              </Badge>
            </div>
          </DrawerTitle>
          <DrawerDescription>
            <div className={`inline-block h-2 w-full rounded-full ${item.color}`}></div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-6">{dialogContent}</div>
      </DrawerContent>
    </Drawer>
  )
}
