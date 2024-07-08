import { ISchedule } from '@/shared/interfaces/ISchedule'

import ItemHour from './item-hour'

interface ItemDayProps {
  shedule: ISchedule
}

const ItemDay = ({ shedule }: ItemDayProps) => {
  return (
    <li className="flex gap-0.5">
      <span className="-mt-[10px] w-12 text-sm text-blue-900">{shedule.hour}</span>
      <div className="flex w-[calc(100%-50px)] flex-col gap-1 bg-blue-50 pb-1">
        <hr className="w-full border-t-[1.5px] border-dashed border-blue-400" />
        <div className="scrollbar-custom h-14 w-full overflow-x-auto text-blue-900">
          <ul className="flex h-full w-full gap-1 px-1">
            {shedule.activities1.map((activity) => (
              <ItemHour key={activity.id} activity={activity} />
            ))}
          </ul>
        </div>
        <div className="scrollbar-custom h-14 w-full overflow-x-auto text-blue-900">
          <ul className="flex h-full w-full gap-1 px-1">
            {shedule.activities2.map((activity) => (
              <ItemHour key={activity.id} activity={activity} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default ItemDay
