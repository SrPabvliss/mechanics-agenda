import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { IScheduleMechanic } from '@/shared/interfaces/ISchedule'
import { IUser } from '@/shared/interfaces/IUser'
import * as React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'

import TimePickerByMechanic from './time-picker-by-mechanic'

interface TimeSelectionProps {
  children: React.ReactNode
  onChange: (selectTime: string, selectMechanic: IUser) => void
  selectTime?: string
  selectMechanic?: IUser
}

const TimePickerDialog: React.FC<TimeSelectionProps> = ({ children, onChange, selectMechanic, selectTime }) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const mechanics: IUser[] = [
    {
      ci: '2101031025',
      firstName: 'Juan',
      lastName: 'Perez',
      role: 'MECHANIC',
      color: 'bg-blue-200',
    },
    {
      ci: '2101031026',
      firstName: 'Maria',
      lastName: 'Lopez',
      role: 'MECHANIC',
      color: 'bg-red-200',
    },
    {
      ci: '2101031027',
      firstName: 'Pedro',
      lastName: 'Garcia',
      role: 'MECHANIC',
      color: 'bg-green-200',
    },
    {
      ci: '2101031028',
      firstName: 'Ana',
      lastName: 'Gomez',
      role: 'MECHANIC',
      color: 'bg-yellow-200',
    },
    {
      ci: '2101031029',
      firstName: 'Carlos',
      lastName: 'Martinez',
      role: 'MECHANIC',
      color: 'bg-purple-200',
    },
  ]

  const events: IScheduleMechanic[] = [
    { hour: '08:00', events: { '2101031025': { events1: true, events2: false } } },
    {
      hour: '09:00',
      events: { '2101031025': { events1: true, events2: false }, '2101031028': { events1: true, events2: false } },
    },
    {
      hour: '10:00',
      events: { '2101031029': { events1: true, events2: true }, '2101031026      ': { events1: true, events2: false } },
    },
    { hour: '11:00', events: { '2101031027': { events1: false, events2: true } } },
    { hour: '12:00', events: { '2101031025': { events1: true, events2: false } } },
    { hour: '13:00', events: { '2101031027': { events1: true, events2: true } } },
    { hour: '14:00', events: {} },
    { hour: '15:00', events: { '2101031025': { events1: true, events2: false } } },
    { hour: '16:00', events: { '2101031027': { events1: true, events2: false } } },
    { hour: '17:00', events: {} },
    { hour: '18:00', events: { '2101031027': { events1: true, events2: false } } },
  ]

  const handleOnChange = (selectTime: string, selectMechanic: IUser) => {
    onChange(selectTime, selectMechanic)
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="w-full cursor-pointer">
          <div className="w-full">{children}</div>
        </DialogTrigger>
        <DialogDescription className="hidden">Descripción del evento</DialogDescription>
        <DialogContent className="max-w-fit">
          <DialogTitle className="text-lg font-bold">Selecciona la hora y el encargado</DialogTitle>
          <div className="px-4 pb-6">
            <TimePickerByMechanic
              mechanics={mechanics}
              scheduleMechanics={events}
              onChange={handleOnChange}
              selectMechanic={selectMechanic}
              selectTime={selectTime}
            />
          </div>
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
      <DrawerContent className="px-2">
        <ScrollArea className="max-h-[calcu(100%-50px)]">
          <DialogTitle className="text-lg font-bold">Selecciona la hora y el encargado</DialogTitle>
          <div className="pb-6">
            <TimePickerByMechanic
              mechanics={mechanics}
              scheduleMechanics={events}
              onChange={handleOnChange}
              selectMechanic={selectMechanic}
              selectTime={selectTime}
            />
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

export default TimePickerDialog
