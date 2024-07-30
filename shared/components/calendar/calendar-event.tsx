import { IEvent } from '@/shared/interfaces/IEvents'

interface CalendarEventProps {
  event: IEvent
}

const CalendarEvent = ({ event }: CalendarEventProps) => {
  return (
    <div className={'rounded md:px-1'} style={{ background: event.color }}>
      <p className="truncate text-start text-xs text-blue-900 md:text-sm">{event.title}</p>
    </div>
  )
}

export default CalendarEvent
