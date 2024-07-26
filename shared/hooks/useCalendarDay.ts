'use client'
import { useEffect, useState } from 'react'

import { formatDate } from '@/lib/formatDate'

import { scheduleDay } from '../constants/schedule-day'
import { IDailySchedule } from '../interfaces/ISchedule'
import { useUpdateQueryParam } from './update-query-param'

interface IUseCalendarDay {
  date: string
  onChange: (date: string) => void
  onClick: (id: number) => void
  scheduleWithEvents: IDailySchedule[]
}

const useCalendarDay = ({ date, onChange, onClick, scheduleWithEvents }: IUseCalendarDay) => {
  const [currentDate, setCurrentDate] = useState<string>(date)
  const updateQueryParam = useUpdateQueryParam()
  const [schedule, setSchedule] = useState<IDailySchedule[]>(
    scheduleWithEvents.length ? scheduleWithEvents : scheduleDay,
  )

  useEffect(() => {
    setSchedule(scheduleWithEvents.length ? scheduleWithEvents : scheduleDay)
  }, [scheduleWithEvents])

  useEffect(() => {
    onChangeDay(currentDate)
    updateQueryParam([{ param: 'date', value: formatDate(currentDate) }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate])

  const onChangeDay = (date: string) => {
    onChange(date)
  }

  const handleClickEvent = (id: number) => {
    onClick(id)
  }

  return {
    day: currentDate,
    setCurrentDate,
    handleClickEvent,
    schedule,
  }
}

export default useCalendarDay
