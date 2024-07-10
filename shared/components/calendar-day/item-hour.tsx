import { IEvent } from '@/shared/interfaces/IEvents'

interface ItemHourProps {
  activity: IEvent
  onClick: (id: number) => void
}

const ItemHour = ({ activity: { id, color, label, startTime, title }, onClick }: ItemHourProps) => {
  return (
    <li className={`flex h-full w-full flex-col rounded-md p-1 ${color}`} onClick={() => onClick(id)}>
      <div className="flex items-center gap-1 truncate">
        <h1 className="font-medium">{title}</h1> <span className="text-sm">{startTime}</span>
      </div>
      <p className="truncate">{label}</p>
    </li>
  )
}

export default ItemHour
