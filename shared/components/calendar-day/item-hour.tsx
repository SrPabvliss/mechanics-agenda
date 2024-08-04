import { IEvent } from '@/shared/interfaces/IEvents'

import { DetailsDialog } from '../details-dialog'

interface ItemHourProps {
  event: IEvent
  onDelete: (id: number) => void
}

const ItemHour = ({ event, event: { color, label, startTime, title }, onDelete }: ItemHourProps) => {
  return (
    <DetailsDialog item={event} onDelete={onDelete}>
      <li className={`flex h-full w-full cursor-pointer flex-col rounded-md p-1`} style={{ background: color }}>
        <div className="flex items-center gap-1 truncate">
          <h1 className="font-medium">{title}</h1> <span className="text-sm">{startTime}</span>
        </div>
        <p className="truncate">{label}</p>
      </li>
    </DetailsDialog>
  )
}

export default ItemHour
