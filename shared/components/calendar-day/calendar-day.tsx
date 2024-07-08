import { ISchedule } from '@/shared/interfaces/ISchedule'

import ItemDay from './item-day'

interface ItemHourProps {
  day: string
  shedules: ISchedule[]
}

const CalendarDay = ({ shedules, day }: ItemHourProps) => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-medium text-blue-900">{day}</h2>
      <ul className="mt-4 flex flex-col">
        {shedules.map((shedule) => (
          <ItemDay key={shedule.id} shedule={shedule} />
        ))}
      </ul>
    </section>
  )
}

export default CalendarDay
