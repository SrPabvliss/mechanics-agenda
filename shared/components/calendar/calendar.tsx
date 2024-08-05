'use client'

import useCalendar from '@/shared/hooks/useCalendar'
import { IEventsMonth } from '@/shared/interfaces/IEvents'
import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import LoadingBar from '../loading-bar/loading-bar'
import CalendarDayInMonth from './calendar-day-in-month'
import CalendarDaysOfWeek from './calendar-day-of-week'
import CalendarHeader from './calendar-header'

interface CalendarProps {
  events: IEventsMonth
  isLoading?: boolean
  onClickDay: (date: string) => void
  onChangeMonth: (date1: string, date2: string) => void
}

const Calendar: React.FC<CalendarProps> = ({ events, onClickDay, onChangeMonth, isLoading }) => {
  const { currentDate, daysInMonth, handlePrevMonth, handleNextMonth, handleDayClick } = useCalendar({
    onChangeMonth,
    onClickDay,
  })

  return (
    <div className="h-[calc(100vh_-_226px)] w-full">
      <CalendarHeader currentDate={currentDate} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} />
      <div className="grid grid-cols-7" style={{ borderRight: '1px dashed' }}>
        <CalendarDaysOfWeek />
        {isLoading && (
          <div className="z-50 col-span-7 -mb-1">
            <LoadingBar />
          </div>
        )}
      </div>
      <ScrollArea className="h-full">
        <div className="grid grid-cols-7" style={{ borderBottom: '1px dashed', borderRight: '1px dashed' }}>
          {daysInMonth.map((dayInMonth, index) => (
            <CalendarDayInMonth
              key={index}
              currentDate={currentDate}
              dayInMonth={dayInMonth}
              events={events}
              handleDayClick={handleDayClick}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Calendar
