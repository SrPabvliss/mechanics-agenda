'use client'
import { useEffect, useState } from 'react'

interface IUseCalendarDay {
  date: string
  onChange: (date: string) => void
  onClick: (id: number) => void
}

const useCalendarDay = ({ date, onChange, onClick }: IUseCalendarDay) => {
  const [day, setDay] = useState<string>(date)

  useEffect(() => {
    onChangeDay(day)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day])

  const onChangeDay = (day: string) => {
    onChange(day)
  }

  const handleClickEvent = (id: number) => {
    onClick(id)
  }

  return {
    day,
    setDay,
    handleClickEvent,
  }
}

export default useCalendarDay
