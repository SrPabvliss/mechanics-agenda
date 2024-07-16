import { IEvent } from '@/shared/interfaces/IEvents'

import { DetailsDialog } from '../details-dialog'

interface ItemHourProps {
  activity: IEvent
  onClick: (id: number) => void
}

const ItemHour = ({ activity, activity: { id, color, label, startTime, title }, onClick }: ItemHourProps) => {
  return (
    <DetailsDialog item={activity}>
      <li className={`flex h-full w-full flex-col rounded-md p-1 ${color}`} onClick={() => onClick(id)}>
        <div className="flex items-center gap-1 truncate">
          <h1 className="font-medium">{title}</h1> <span className="text-sm">{startTime}</span>
        </div>
        <p className="truncate">{label}</p>
      </li>
    </DetailsDialog>
  )
}

export default ItemHour
