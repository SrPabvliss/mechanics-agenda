'use client'

import useCalendar from '@/shared/hooks/useCalendar'
import { IEvents } from '@/shared/interfaces/IEvents'

import CalendarDayInMonth from './calendar-day-in-month'
import CalendarDaysOfWeek from './calendar-day-of-week'
import CalendarHeader from './calendar-header'

interface CalendarProps {
  events: IEvents
  onClickDay: (date: string) => void
  onChangeMonth: (month: number, year: number) => void
}

const Calendar = ({ events, onClickDay, onChangeMonth }: CalendarProps) => {
  const { currentDate, daysInMonth, handlePrevMonth, handleNextMonth, handleDayClick } = useCalendar({
    onChangeMonth,
    onClickDay,
  })

  return (
    <div className="h-full w-full">
      <div className="overflow-hidden">
        <CalendarHeader currentDate={currentDate} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} />
        <div className="p-2">
          <div className="grid grid-cols-7 border-b-[1.5px] border-r-[1.5px] border-dashed border-blue-400">
            <CalendarDaysOfWeek />
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
        </div>
      </div>
    </div>
  )
}

export default Calendar
