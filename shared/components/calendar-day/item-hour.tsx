import { IEvent } from '@/shared/interfaces/IEvents'

import { DetailsDialog } from '../details-dialog'

interface ItemHourProps {
  event: IEvent
  onDelete: (id: number) => void
}

const ItemHour = ({ event, event: { color, label, startTime, title }, onDelete }: ItemHourProps) => {
  return (
    <DetailsDialog item={event} onDelete={onDelete}>
      <li
        className={`flex h-full w-full cursor-pointer flex-col justify-center rounded-md p-1`}
        style={{ background: color }}
      >
        <div className="flex items-center gap-1 truncate">
          <h1 className="font-medium">{title}</h1> <span className="text-sm">{startTime}</span>
        </div>
        <p className="max-w-96 truncate text-nowrap text-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-max">
          {label}
        </p>
      </li>
    </DetailsDialog>
  )
}

export default ItemHour
