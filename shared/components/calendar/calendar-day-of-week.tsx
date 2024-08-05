import { daysOfWeek } from '@/shared/constants/calendar'

const CalendarDaysOfWeek = () => {
  return (
    <>
      {daysOfWeek.map((day) => (
        <div key={day} className="text-center font-medium" style={{ borderLeft: '1px dashed' }}>
          <span className="text-blue-900 dark:text-white">{day}</span>
        </div>
      ))}
    </>
  )
}

export default CalendarDaysOfWeek
