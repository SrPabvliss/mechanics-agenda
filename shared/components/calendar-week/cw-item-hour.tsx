import { IEvent } from '@/shared/interfaces/IEvents'

import { cn } from '@/lib/utils'

interface CWItemHourProps {
  event: IEvent
}

const CWItemHour = ({ event }: CWItemHourProps) => {
  return (
    <li className={cn('flex h-full w-full items-center justify-center truncate rounded-md p-0.5', event.color)}>
      <p className="truncate text-xs text-blue-900 md:text-sm">{event.title}</p>
    </li>
  )
}

export default CWItemHour
