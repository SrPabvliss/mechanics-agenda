import { monthNames } from '@/shared/constants/calendar'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarHeaderProps {
  handlePrevMonth: () => void
  handleNextMonth: () => void
  currentDate: Date
}

const CalendarHeader = ({ currentDate, handleNextMonth, handlePrevMonth }: CalendarHeaderProps) => {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h2 className="text-lg font-medium text-blue-900 dark:text-white lg:text-xl">{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h2>
      <div className="">
        <button onClick={handlePrevMonth} className="rounded-full bg-blue-900 p-1 text-white">
          <ChevronLeft />
        </button>
        <button onClick={handleNextMonth} className="ml-6 rounded-full bg-blue-900 p-1 text-white">
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

export default CalendarHeader
