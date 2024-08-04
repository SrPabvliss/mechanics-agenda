import { QuotesAdapter } from '@/features/quotes/adapters/quotes-adapter'
import useQuotesByFilterQuery from '@/features/quotes/hooks/use-quotes-by-filter-query'
import { useQuotesByIdQuery } from '@/features/quotes/hooks/use-quotes-by-id-query'
import useUsersQuery from '@/features/users/hooks/use-users-query'
import { UserRole } from '@/features/users/models/IApiUser'
import { IUser } from '@/features/users/models/IUser'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { formatDate, formatDateTimeEC } from '@/lib/formatDate'
import { formatTime } from '@/lib/formatTime'

import { isDefaultValues } from '../components/time-selection/time-picker-dialog'
import { IScheduleMechanicRecord } from '../interfaces/ISchedule'
import { useMediaQuery } from './use-media-query'

interface UseTimeSelectionByMechanicProps {
  onChange: (selectTime: string, selectMechanic: IUser) => void
  selectTime?: string
  selectMechanic?: IUser
}

const useTimePickerByMechanic = ({ onChange, selectMechanic, selectTime }: UseTimeSelectionByMechanicProps) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { watch } = useFormContext()
  const date = watch('date')
  const idQuote = watch('id')
  const [mechanicSchedule, setMechanicSchedule] = React.useState<IScheduleMechanicRecord>({})
  const { data: initialQuote } = useQuotesByIdQuery(idQuote)
  const [defaultValues, setDefaultValues] = React.useState<{ selectTime: string; selectMechanic: IUser; date: Date }>()
  const { data: users, isFetching: isFetchingUsers, isError: isErrorUsers, isPaused: isPausedUsers } = useUsersQuery()
  const {
    data: quotes,
    isFetching: isFetchingQuotes,
    isError: isErrorQuotes,
    isPaused: isPausedQuotes,
  } = useQuotesByFilterQuery({
    startDate: formatDateTimeEC(date, '00:00'),
    endDate: formatDateTimeEC(date, '23:59'),
  })
  const mechanics = React.useMemo(() => users?.filter((user) => user.role === UserRole.MECHANIC) || [], [users])

  React.useEffect(() => {
    if (initialQuote) {
      setDefaultValues({
        selectTime: formatTime(initialQuote.date),
        selectMechanic: initialQuote.user,
        date: new Date(initialQuote.date),
      })
    }
  }, [initialQuote])

  React.useEffect(() => {
    if (quotes && date) {
      setMechanicSchedule(QuotesAdapter.quotesMechanicsAdapter(quotes, formatDate(date)))
    }
  }, [quotes, date])

  const validateSelectTime = React.useCallback(() => {
    if (isFetchingQuotes || isPausedQuotes || isErrorQuotes || isFetchingUsers || isPausedUsers || isErrorUsers) return
    if (!date || !selectTime || !selectMechanic?.ci) return
    if (!mechanicSchedule[formatDate(date)]?.length) return

    mechanicSchedule[formatDate(date)]?.forEach((eventSchedule) => {
      const selectTimeEvent1 = eventSchedule.hour
      const selectTimeEvent2 = `${eventSchedule.hour.split(':')[0]}:30`

      const isDefault1 = isDefaultValues({
        defaultValues,
        selectMechanicCI: selectMechanic.ci,
        date,
        selectTime: selectTimeEvent1,
      })
      const isDefault2 = isDefaultValues({
        defaultValues,
        selectMechanicCI: selectMechanic.ci,
        date,
        selectTime: selectTimeEvent2,
      })

      if (selectTime === selectTimeEvent1 && eventSchedule.events[selectMechanic.ci]?.events1 && !isDefault1) {
        onChange('', { ci: '', firstName: '', lastName: '', role: UserRole.MECHANIC, color: '' })
      }
      if (selectTime === selectTimeEvent2 && eventSchedule.events[selectMechanic.ci]?.events2 && !isDefault2) {
        onChange('', { ci: '', firstName: '', lastName: '', role: UserRole.MECHANIC, color: '' })
      }
    })
  }, [
    isFetchingQuotes,
    isPausedQuotes,
    isErrorQuotes,
    isFetchingUsers,
    isPausedUsers,
    isErrorUsers,
    date,
    selectTime,
    selectMechanic,
    mechanicSchedule,
    defaultValues,
    onChange,
  ])

  React.useEffect(() => {
    validateSelectTime()
  }, [validateSelectTime])

  const handleOnChange = (selectTime: string, selectMechanic: IUser) => {
    onChange(selectTime, selectMechanic)
    setOpen(false)
  }

  return {
    date,
    mechanicSchedule,
    defaultValues,
    isFetchingQuotes,
    isPausedQuotes,
    isErrorQuotes,
    isFetchingUsers,
    isPausedUsers,
    isErrorUsers,
    mechanics,
    handleOnChange,
    isDesktop,
    setOpen,
    open,
  }
}

export default useTimePickerByMechanic
