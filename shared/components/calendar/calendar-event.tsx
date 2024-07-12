import { IEvent } from '@/shared/interfaces/IEvents'

import { cn } from '@/lib/utils'

interface CalendarEventProps {
  event: IEvent
}

const CalendarEvent = ({ event }: CalendarEventProps) => {
  return (
    <div className={cn('rounded md:px-1', event.color)}>
      <p className="truncate text-start text-xs text-blue-900 md:text-sm">{event.title}</p>
    </div>
  )
}

export default CalendarEvent
