import { IEvent } from '@/shared/interfaces/IEvents'

interface CWItemHourProps {
  event: IEvent
}

const CWItemHour = ({ event }: CWItemHourProps) => {
  return (
    <li
      className={'flex h-full w-full items-center justify-center truncate rounded-md p-0.5'}
      style={{ background: event.color }}
    >
      <p className="truncate text-xs text-blue-900 md:text-sm">{event.title}</p>
    </li>
  )
}

export default CWItemHour
