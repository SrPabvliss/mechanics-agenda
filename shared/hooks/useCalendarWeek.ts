import { useSearchParams } from 'next/navigation'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { generateWeek } from '@/lib/generateWeek'

import { scheduleWeek } from '../constants/schedule-week'
import { IDay } from '../interfaces/ICalendar'
import { IScheduleWeek } from '../interfaces/ISchedule'

interface IUseCalendarWeek {
  scheduleWithEvents: IScheduleWeek[]
  onChange: (date1: string, date2: string) => void
  onClick: (date: string) => void
}

const useCalendarWeek = ({ scheduleWithEvents, onChange, onClick }: IUseCalendarWeek) => {
  const searchParams = useSearchParams()
  const [week, setWeek] = useState<IDay[]>([])
  const [schedule, setSchedule] = useState<IScheduleWeek[]>(
    scheduleWithEvents.length ? scheduleWithEvents : scheduleWeek,
  )

  useEffect(() => {
    const date = searchParams.get('date') || dayjs().format('YYYY-MM-DD')
    setWeek(generateWeek(date))
  }, [searchParams])

  useEffect(() => {
    setSchedule(scheduleWithEvents.length ? scheduleWithEvents : scheduleWeek)
  }, [scheduleWithEvents])

  useEffect(() => {
    if (week.length) {
      handleOnChange()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week])

  const handleOnChange = () => {
    onChange(week[0].date, week[6].date)
  }

  const handleClickEvent = (date: string) => {
    onClick(date)
  }

  return { week, schedule, handleOnChange, handleClickEvent }
}

export default useCalendarWeek
