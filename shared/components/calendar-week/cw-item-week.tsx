import { IDay } from '@/shared/interfaces/ICalendar'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'

import CWItemDay from './cw-item-day'

interface CWItemWeekProps {
  week: IDay[]
  schedule: IScheduleWeek
  onClick: (date: string) => void
}

const CWItemWeek = ({ week, schedule, onClick }: CWItemWeekProps) => {
  return (
    <>
      <span id={schedule.hour} className="w-full text-center text-xs text-blue-900 dark:text-white md:text-sm">
        {schedule.hour}
      </span>
      {week.map((day) => (
        <CWItemDay key={day.date} day={day} schedule={schedule} onClick={onClick} />
      ))}
    </>
  )
}

export default CWItemWeek
