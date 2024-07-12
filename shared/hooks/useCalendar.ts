'use client'

import { useEffect, useState } from 'react'

import { generateCalendar } from '@/lib/generateCalendar'

import { IDay } from '../interfaces/ICalendar'

interface IUseCalendar {
  onClickDay: (day: string) => void
  onChangeMonth: (month: number, year: number) => void
}

const useCalendar = ({ onChangeMonth, onClickDay }: IUseCalendar) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [daysInMonth, setDaysInMonth] = useState<IDay[]>([])

  useEffect(() => {
    setDaysInMonth(generateCalendar(currentDate.getFullYear(), currentDate.getMonth()))
    onChangeMonth(currentDate.getMonth() + 1, currentDate.getFullYear())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate])

  const handlePrevMonth = (): void => {
    setCurrentDate((prev) => {
      const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      return prevMonth
    })
  }

  const handleNextMonth = (): void => {
    setCurrentDate((prev) => {
      const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      return nextMonth
    })
  }

  const handleDayClick = ({ date }: IDay): void => {
    onClickDay(date)
  }

  return {
    currentDate,
    daysInMonth,
    handlePrevMonth,
    handleNextMonth,
    handleDayClick,
  }
}

export default useCalendar
