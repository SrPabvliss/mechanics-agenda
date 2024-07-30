import { IUser } from '@/features/users/models/IUser'
import { IScheduleMechanic } from '@/shared/interfaces/ISchedule'
import * as React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import TPHeader from './tp-header'
import TPItemMechanics from './tp-item-mechanics'

interface TimePickerByMechanicProps {
  scheduleMechanics: IScheduleMechanic[]
  mechanics: IUser[]
  onChange: (selectTime: string, selectMechanic: IUser) => void
  selectTime?: string
  selectMechanic?: IUser

  defaultValues?: { selectTime: string; selectMechanic: IUser; date: Date }
  currentDate: Date
}

const TimePickerByMechanic: React.FC<TimePickerByMechanicProps> = ({
  mechanics,
  scheduleMechanics,
  onChange,
  selectMechanic,
  selectTime,
  defaultValues,
  currentDate,
}) => {
  const length = mechanics.length + 1

  return (
    <section className="h-full w-full overflow-hidden">
      <div
        className="mt-2 grid border-r-[1.5px] border-dashed  border-blue-600 dark:border-blue-400"
        style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}
      >
        <div></div>
        {mechanics.map((mechanic, index) => (
          <TPHeader key={index} mechanic={mechanic} />
        ))}
      </div>
      <ScrollArea className="h-[calc(100vh-50vh)]">
        <div
          className="grid border-r-[1.5px] border-dashed border-blue-600 dark:border-blue-400"
          style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}
        >
          {scheduleMechanics.map((item) => (
            <TPItemMechanics
              key={item.hour}
              schedule={item}
              mechanics={mechanics}
              onChange={onChange}
              selectMechanic={selectMechanic}
              selectTime={selectTime}
              defaultValues={defaultValues}
              currentDate={currentDate}
            />
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}

export default TimePickerByMechanic
