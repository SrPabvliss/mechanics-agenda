import useCalendarDay from '@/shared/hooks/useCalendarDay'
import { ISchedule } from '@/shared/interfaces/ISchedule'

import CalendarDayHeader from './calendar-day-header'
import ItemDay from './item-day'

interface ItemHourProps {
  date?: string
  schedules: ISchedule[]
  onClick: (id: number) => void
  onChange: (day: string) => void
}

const CalendarDay = ({ schedules, date = new Date().toISOString(), onClick, onChange }: ItemHourProps) => {
  const { day, setDay, handleClickEvent } = useCalendarDay({ date, onChange, onClick })

  return (
    <section className="w-full">
      <CalendarDayHeader day={day} setDay={setDay} />
      <ul className="mt-4 flex flex-col">
        {schedules.map((schedule) => (
          <ItemDay key={schedule.id} schedule={schedule} onClick={handleClickEvent} />
        ))}
      </ul>
    </section>
  )
}

export default CalendarDay
