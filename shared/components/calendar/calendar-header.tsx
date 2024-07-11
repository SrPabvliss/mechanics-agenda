import { monthNames } from '@/shared/constants/calendar'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarHeaderProps {
  handlePrevMonth: () => void
  handleNextMonth: () => void
  currentDate: Date
}

const CalendarHeader = ({ currentDate, handleNextMonth, handlePrevMonth }: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      <button onClick={handlePrevMonth} className="rounded-full bg-blue-900 p-1 text-white">
        <ChevronLeft />
      </button>
      <h2 className="text-lg font-medium text-blue-900 dark:text-white lg:text-xl">{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h2>
      <button onClick={handleNextMonth} className="rounded-full bg-blue-900 p-1 text-white">
        <ChevronRight />
      </button>
    </div>
  )
}

export default CalendarHeader
