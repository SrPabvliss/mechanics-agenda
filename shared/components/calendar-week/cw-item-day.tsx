import { IDay } from '@/shared/interfaces/ICalendar'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'

import { cn } from '@/lib/utils'

import CWItemHour from './cw-item-hour'

interface CWItemDayProps {
  day: IDay
  schedule: IScheduleWeek
  onClick: (date: string) => void
}

const CWItemDay = ({ day, schedule, onClick }: CWItemDayProps) => {
  const containsEvents = schedule.events[day.date] !== undefined
  const handleClick = () => {
    if (containsEvents) onClick(day.date)
  }
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-0.5 border-dashed border-blue-400 bg-blue-50 py-0.5 dark:bg-blue-950 md:gap-1 md:py-1',
        containsEvents && 'cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900',
      )}
      style={{ borderLeft: '1px dashed blue', borderTop: '1px dashed blue' }}
      onClick={handleClick}
    >
      <ul className="flex h-10 w-full gap-0.5 px-0.5 md:gap-1 md:px-1">
        {schedule.events[day.date]?.events1.map((event) => <CWItemHour key={event.id} event={event} />)}
      </ul>

      <ul className="flex h-10 w-full gap-0.5 px-0.5 md:gap-1 md:px-1">
        {schedule.events[day.date]?.events2.map((event) => <CWItemHour key={event.id} event={event} />)}
      </ul>
    </div>
  )
}

export default CWItemDay
