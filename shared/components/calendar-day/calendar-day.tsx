import useScrollById from '@/shared/hooks/use-scroll-by-id'
import useCalendarDay from '@/shared/hooks/useCalendarDay'
import { IDailySchedule } from '@/shared/interfaces/ISchedule'

import { getCurrentHour } from '@/lib/getCurrentHour'

import LoadingBar from '../loading-bar/loading-bar'
import CalendarDayHeader from './calendar-day-header'
import ItemDay from './item-day'

interface ItemHourProps {
  date?: string
  schedule: IDailySchedule[]
  isLoading?: boolean
  onDelete: (id: number) => void
  onChange: (date: string) => void
}

const CalendarDay = ({
  schedule: scheduleWithEvents,
  isLoading,
  date = new Date().toISOString(),
  onDelete,
  onChange,
}: ItemHourProps) => {
  const { day, setCurrentDate, schedule } = useCalendarDay({
    date,
    onChange,
    onDelete,
    scheduleWithEvents,
  })

  useScrollById(getCurrentHour(), !!schedule.length)

  return (
    <div className="h-[calc(100vh_-_206px)] w-full">
      <CalendarDayHeader day={day} setDay={setCurrentDate} />
      {isLoading && (
        <div className="ml-[50px]">
          <LoadingBar />
        </div>
      )}
      <ul className="scrollbar-hide flex h-full flex-col overflow-auto">
        {schedule.map((item) => (
          <ItemDay key={item.hour} schedule={item} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  )
}

export default CalendarDay
