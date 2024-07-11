import { daysOfWeek } from '@/shared/constants/calendar'
import useCalendarWeek from '@/shared/hooks/useCalendarWeek'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'

import CWHeader from './cw-header'
import CWItemDayHead from './cw-item-day-head'
import CWItemWeek from './cw-item-week'

interface CalendarWeekProps {
  schedule: IScheduleWeek[]
  onChange: (date1: string, date2: string) => void
  onClick: (date: string) => void
}

const CalendarWeek = ({ onChange, onClick, schedule: scheduleWithEvents }: CalendarWeekProps) => {
  const { week, date, setDate, schedule, handleClickEvent } = useCalendarWeek({
    scheduleWithEvents,
    onChange,
    onClick,
  })

  return (
    <section className="h-full w-full">
      <CWHeader date={date} setDate={setDate} />

      <div className="mt-2 grid grid-cols-8 border-r-[1.5px] border-dashed border-blue-400">
        <div></div>
        {daysOfWeek.map((day, index) => (
          <CWItemDayHead key={day} day={day} index={index} week={week} />
        ))}
        {schedule.map((item) => (
          <CWItemWeek key={item.hour} week={week} schedule={item} onClick={handleClickEvent} />
        ))}
      </div>
    </section>
  )
}

export default CalendarWeek
