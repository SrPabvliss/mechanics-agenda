import { IDailySchedule } from '@/shared/interfaces/ISchedule'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import ItemHour from './item-hour'

interface ItemDayProps {
  schedule: IDailySchedule
  onDelete: (id: number) => void
}

const ItemDay = ({ schedule, onDelete }: ItemDayProps) => {
  return (
    <li id={schedule.hour} className="flex gap-0.5">
      <span className=" w-12 text-sm text-blue-900 dark:text-white">{schedule.hour}</span>
      <div
        className="flex w-[calc(100%-50px)] flex-col gap-1 bg-blue-50 pb-1 dark:bg-blue-950"
        style={{ borderTop: '1px dashed' }}
      >
        <ScrollArea className="text-blue-900">
          <ul className="flex h-16 w-full gap-1 p-1">
            {schedule.events1.map((event) => (
              <ItemHour key={event.id} event={event} onDelete={onDelete} />
            ))}
          </ul>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <ScrollArea className="text-blue-900">
          <ul className="flex h-16 w-full gap-1 px-1">
            {schedule.events2.map((event) => (
              <ItemHour key={event.id} event={event} onDelete={onDelete} />
            ))}
          </ul>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </li>
  )
}

export default ItemDay
