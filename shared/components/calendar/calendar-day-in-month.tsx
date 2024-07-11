import { IDay } from '@/shared/interfaces/ICalendar'
import { IEvents } from '@/shared/interfaces/IEvents'

import { ScrollArea } from '@/components/ui/scroll-area'

import { cn } from '@/lib/utils'

import CalendarEvent from './calendar-event'

interface CalendarDayInMonthProps {
  handleDayClick: ({ date }: IDay) => void
  dayInMonth: IDay
  currentDate: Date
  events: IEvents
}
const CalendarDayInMonth = ({ currentDate, dayInMonth, events, handleDayClick }: CalendarDayInMonthProps) => {
  return (
    <div
      className={cn(
        'flex h-28 cursor-pointer flex-col border-l-[1.5px] border-t-[1.5px] border-dashed border-blue-400 bg-blue-50 p-1 text-center transition-all duration-200 dark:text-white md:p-2',
        currentDate.getMonth() === dayInMonth.month
          ? 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900'
          : 'bg-slate-200 hover:bg-slate-300 dark:bg-gray-900 dark:hover:bg-gray-800',
      )}
      onClick={() => handleDayClick(dayInMonth)}
    >
      <span
        className={cn(
          'mx-auto flex h-8 w-8 items-center justify-center rounded-full p-1',
          dayInMonth.day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear() &&
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
