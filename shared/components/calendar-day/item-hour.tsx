import { IActivity } from '@/shared/interfaces/ISchedule'

interface ItemHourProps {
  activity: IActivity
}

const ItemHour = ({ activity: { color, label, startTime, title } }: ItemHourProps) => {
  return (
    <li className={`flex h-full w-full flex-col rounded-md ${color} p-1`}>
      <div className="flex items-center gap-1 truncate">
        <h1 className="font-medium">{title}</h1> <span className="text-sm">{startTime}</span>
      </div>
      <p className="truncate">{label}</p>
    </li>
  )
}

export default ItemHour
