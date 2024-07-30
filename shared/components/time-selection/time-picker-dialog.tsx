import { IUser } from '@/features/users/models/IUser'
import useTimePickerByMechanic from '@/shared/hooks/use-time-picker-by-mechanic'
import { Ban } from 'lucide-react'
import * as React from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerTrigger } from '@/components/ui/drawer'

import { formatDate } from '@/lib/formatDate'
import { cn } from '@/lib/utils'

import Spinner from '../spinner'
import TimePickerByMechanic from './time-picker-by-mechanic'

interface TimeSelectionProps {
  children: React.ReactNode
  onChange: (selectTime: string, selectMechanic: IUser) => void
  selectTime?: string
  selectMechanic?: IUser
}

interface IsDafaultValuesProps {
  defaultValues?: { selectTime: string; selectMechanic: IUser; date: Date }
  selectMechanicCI: string
  date: Date
  selectTime: string
}

export const isDefaultValues = ({ defaultValues, selectMechanicCI, selectTime, date }: IsDafaultValuesProps) => {
  return (
    defaultValues?.selectTime === selectTime &&
    defaultValues?.selectMechanic.ci === selectMechanicCI &&
    defaultValues?.date.toDateString() === date?.toDateString()
  )
}

const TimePickerDialog: React.FC<TimeSelectionProps> = ({ children, onChange, selectMechanic, selectTime }) => {
  const {
    date,
    defaultValues,
    mechanicSchedule,
    isErrorQuotes,
    isErrorUsers,
    isFetchingQuotes,
    isFetchingUsers,
    isPausedQuotes,
    isPausedUsers,
    mechanics,
    handleOnChange,
    isDesktop,
    setOpen,
    open,
  } = useTimePickerByMechanic({ onChange, selectMechanic, selectTime })

  const renderAlert = ({ title, description }: { title: string; description: string }) => {
    return (
      <Alert variant={'destructive'} className="border-none">
        <Ban className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    )
  }

  const renderTimePicker = () => {
    if (!date)
      return renderAlert({
        title: 'Selecciona una fecha',
        description: 'Por favor selecciona una fecha para poder ver los horarios disponibles',
      })
    if (isFetchingUsers || isPausedUsers) return <Spinner description="Cargando mecánicos ..." />
    if (isFetchingQuotes || isPausedQuotes) return <Spinner description="Cargando horarios ..." />
    if (isErrorUsers)
      return renderAlert({
        title: 'No se logró cargar los mecánicos',
        description: 'Por favor intenta nuevamente',
      })
    if (isErrorQuotes)
      return renderAlert({
        title: 'No se logró cargar los horarios',
        description: 'Por favor intenta nuevamente',
      })
    if (!mechanics.length)
      return renderAlert({
        title: 'No hay mecánicos disponibles',
        description: 'Por favor contacta al administrador para asignar mecánicos',
      })
    if (!mechanicSchedule[formatDate(date)]?.length)
      return renderAlert({
        title: 'No se logró cargar los horarios length',
        description: 'Por favor intenta nuevamente',
      })

    return (
      <TimePickerByMechanic
        mechanics={mechanics}
        scheduleMechanics={mechanicSchedule[formatDate(date)]}
        onChange={handleOnChange}
        selectMechanic={selectMechanic}
        selectTime={selectTime}
        defaultValues={defaultValues}
        currentDate={date}
      />
    )
  }
  const DialogComponent = isDesktop ? Dialog : Drawer
  const DialogContentComponent = isDesktop ? DialogContent : DrawerContent
  const DialogTriggerComponent = isDesktop ? DialogTrigger : DrawerTrigger
  const DialogDescriptionComponet = isDesktop ? DialogDescription : DrawerDescription

  return (
    <DialogComponent open={open} onOpenChange={setOpen}>
      <DialogTriggerComponent asChild className="w-full cursor-pointer">
        <div className="w-full">{children}</div>
      </DialogTriggerComponent>
      <DialogDescriptionComponet className="hidden">Descripción del evento</DialogDescriptionComponet>
      <DialogContentComponent className={cn('px-4', isDesktop && 'max-w-fit')}>
        <DialogTitle className="mt-1 text-lg font-bold">Selecciona la hora y el encargado</DialogTitle>
        <div className="px-4 pb-6">{renderTimePicker()}</div>
      </DialogContentComponent>
    </DialogComponent>
  )
}

export default TimePickerDialog
