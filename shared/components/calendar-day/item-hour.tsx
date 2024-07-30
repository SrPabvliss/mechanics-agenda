import { IEvent } from '@/shared/interfaces/IEvents'

import { DetailsDialog } from '../details-dialog'

interface ItemHourProps {
  event: IEvent
  onClick: (id: number) => void
}

const ItemHour = ({ event, event: { id, color, label, startTime, title }, onClick }: ItemHourProps) => {
  return (
    <DetailsDialog item={event}>
      <li
        className={`flex h-full w-full flex-col rounded-md p-1`}
        style={{ background: color }}
        onClick={() => onClick(id)}
      >
        <div className="flex items-center gap-1 truncate">
          <h1 className="font-medium">{title}</h1> <span className="text-sm">{startTime}</span>
        </div>
        <p className="truncate">{label}</p>
      </li>
    </DetailsDialog>
  )
}

export default ItemHour
