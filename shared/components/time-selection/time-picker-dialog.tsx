import useQuotesQuery from '@/features/quotes/hooks/use-quotes-query'
import useUsersQuery from '@/features/users/hooks/use-users-query'
import { UserRole } from '@/features/users/models/IApiUser'
import { IUser } from '@/features/users/models/IUser'
import { scheduleMechanic } from '@/shared/constants/schedule-mechanic'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { IScheduleMechanic } from '@/shared/interfaces/ISchedule'
import { Ban } from 'lucide-react'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerTrigger } from '@/components/ui/drawer'

import { formatDateTime } from '@/lib/formatDate'
import { cn } from '@/lib/utils'

import { QuotesAdapter } from '../../../features/quotes/adapters/quotes-adapter'
import Spinner from '../spinner'
import TimePickerByMechanic from './time-picker-by-mechanic'

interface TimeSelectionProps {
  children: React.ReactNode
  onChange: (selectTime: string, selectMechanic: IUser) => void
  selectTime?: string
  selectMechanic?: IUser
}

const TimePickerDialog: React.FC<TimeSelectionProps> = ({ children, onChange, selectMechanic, selectTime }) => {
  const [events, setEvents] = React.useState<IScheduleMechanic[]>(scheduleMechanic)
  const { watch } = useFormContext()

  const date = watch('date')

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const { data: users, isFetching: isFetchingUsers } = useUsersQuery()

  const { data: quotes, isFetching: isFetchingQuotes } = useQuotesQuery({
    date1: formatDateTime(date, '00:00'),
    date2: formatDateTime(date, '23:59'),
  })

  const mechanics = React.useMemo(() => users?.filter((user) => user.role === UserRole.MECHANIC) || [], [users])

  React.useEffect(() => {
    if (quotes) {
      setEvents(QuotesAdapter.quotesMechanicsAdapter(quotes))
    }
  }, [quotes])

  const validateSelectTime = React.useCallback(() => {
    if (selectTime && selectMechanic) {
      events.forEach((event) => {
        if (selectTime === event.hour && event.events[selectMechanic.ci]?.events1) {
          onChange('', { ci: '', firstName: '', lastName: '', role: UserRole.MECHANIC, color: '' })
        }
        if (selectTime === `${event.hour.split(':')[0]}:30` && event.events[selectMechanic.ci]?.events2) {
          onChange(selectTime, selectMechanic)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, mechanics])

  React.useEffect(() => {
    validateSelectTime()
  }, [validateSelectTime])

  const handleOnChange = (selectTime: string, selectMechanic: IUser) => {
    onChange(selectTime, selectMechanic)
    setOpen(false)
  }

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
    if (isFetchingUsers) return <Spinner description="Cargando mecánicos ..." />
    if (isFetchingQuotes) return <Spinner description="Cargando horarios ..." />
    if (!mechanics.length)
      return renderAlert({
        title: 'No hay mecánicos disponibles',
        description: 'Por favor contacta al administrador para asignar mecánicos',
      })
    if (!events.length)
      return renderAlert({
        title: 'No hay horarios disponibles',
        description: 'Por favor selecciona otra fecha para ver los horarios disponibles',
      })

    return (
      <TimePickerByMechanic
        mechanics={mechanics}
        scheduleMechanics={events}
        onChange={handleOnChange}
        selectMechanic={selectMechanic}
        selectTime={selectTime}
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
