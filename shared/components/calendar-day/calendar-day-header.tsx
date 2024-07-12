import dayjs from 'dayjs'
import { CalendarCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { formatDate, formatLongDate } from '@/lib/formatDate'

interface CalendarDayHeaderProps {
  day: string
  setDay: (day: string) => void
}

const CalendarDayHeader = ({ day, setDay }: CalendarDayHeaderProps) => {
  return (
    <div className="flex items-center text-blue-900 dark:text-white">
      <h2 className="w-full text-lg font-medium lg:text-xl">{formatLongDate(day)}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-fit px-1 py-2">
            <CalendarCheck className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <Calendar onDayClick={(day) => setDay(formatDate(day))} selected={dayjs(day).toDate()} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CalendarDayHeader
