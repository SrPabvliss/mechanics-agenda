import useCalendarDay from '@/shared/hooks/useCalendarDay'
import { IDailySchedule } from '@/shared/interfaces/ISchedule'

import CalendarDayHeader from './calendar-day-header'
import ItemDay from './item-day'

interface ItemHourProps {
  date?: string
  schedule: IDailySchedule[]
  onClick: (id: number) => void
  onChange: (day: string) => void
}

const CalendarDay = ({
  schedule: scheduleWithEvents,
  date = new Date().toISOString(),
  onClick,
  onChange,
}: ItemHourProps) => {
  const { day, setDay, handleClickEvent, schedule } = useCalendarDay({ date, onChange, onClick, scheduleWithEvents })

  return (
    <section className="w-full">
      <CalendarDayHeader day={day} setDay={setDay} />
      <ul className="mt-4 flex flex-col">
        {schedule.map((item) => (
          <ItemDay key={item.hour} schedule={item} onClick={handleClickEvent} />
        ))}
      </ul>
    </section>
  )
}

export default CalendarDay
