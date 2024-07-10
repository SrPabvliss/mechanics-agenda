import { daysOfWeek } from '@/shared/constants/calendar'

const CalendarDaysOfWeek = () => {
  return (
    <>
      {daysOfWeek.map((day) => (
        <div key={day} className="border-l-[1.5px] border-dashed border-blue-400 text-center font-medium">
          {day}
        </div>
      ))}
    </>
  )
}

export default CalendarDaysOfWeek
