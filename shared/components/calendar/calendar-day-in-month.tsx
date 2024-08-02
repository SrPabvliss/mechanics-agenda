import { IDay } from '@/shared/interfaces/ICalendar'
import { IEventsMonth } from '@/shared/interfaces/IEvents'

import { ScrollArea } from '@/components/ui/scroll-area'

import { cn } from '@/lib/utils'

import CalendarEvent from './calendar-event'

interface CalendarDayInMonthProps {
  handleDayClick: ({ date }: IDay) => void
  dayInMonth: IDay
  currentDate: Date
  events: IEventsMonth
}
const CalendarDayInMonth = ({ currentDate, dayInMonth, events, handleDayClick }: CalendarDayInMonthProps) => {
  const containsEvents = events[dayInMonth.date] !== undefined

  const handleClick = () => {
    if (containsEvents) handleDayClick(dayInMonth)
  }

  return (
    <div
      className={cn(
        'flex h-32 flex-col border-l-[1.5px] border-t-[1.5px] border-dashed border-blue-400 bg-blue-50 p-1 text-center transition-all duration-200 dark:text-white md:p-2',
        currentDate.getMonth() === dayInMonth.month ? 'bg-blue-50 dark:bg-blue-950' : 'bg-gray-100 dark:bg-gray-800',
        containsEvents &&
          currentDate.getMonth() === dayInMonth.month &&
          'cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900',
        containsEvents &&
          currentDate.getMonth() !== dayInMonth.month &&
          'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700',
      )}
      onClick={() => handleClick()}
    >
      <span
        className={cn(
          'mx-auto flex h-8 w-8 items-center justify-center rounded-full p-1 text-blue-900 dark:text-white',
          dayInMonth.day === new Date().getDate() &&
            dayInMonth.month === new Date().getMonth() &&
            dayInMonth.year === new Date().getFullYear() &&
            'bg-blue-500 text-white',
        )}
      >
        {dayInMonth.day}
      </span>
      <ScrollArea>
        <div className="flex flex-col gap-1">
          {events[dayInMonth.date]?.map((event) => <CalendarEvent key={event.id} event={event} />)}
        </div>
      </ScrollArea>
    </div>
  )
}

export default CalendarDayInMonth
