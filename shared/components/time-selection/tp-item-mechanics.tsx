import { IScheduleMechanic } from '@/shared/interfaces/ISchedule'
import { IUser } from '@/shared/interfaces/IUser'
import React from 'react'

import { cn } from '@/lib/utils'

import ContainsEvents from './contains-events'
import NoEvents from './no-events'

interface TPItemMechanicsProps {
  schedule: IScheduleMechanic
  mechanics: IUser[]
  onChange: (selectTime: string, selectMechanic: IUser) => void
  selectTime?: string
  selectMechanic?: IUser
}

const TPItemMechanics: React.FC<TPItemMechanicsProps> = ({
  mechanics,
  onChange,
  schedule,
  selectMechanic,
  selectTime,
}) => {
  const selectTimeEvent1 = schedule.hour
  const selectTimeEvent2 = schedule.hour.split(':')[0] + ':30'
  return (
    <>
      <span className=" w-full text-center text-xs text-blue-900 dark:text-white md:text-sm">{schedule.hour}</span>
      {mechanics.map((mechanic, index) => (
        <div
          className={cn(
            'flex w-full flex-col gap-1 border-l-[1.5px] border-t-[1.5px] border-dashed border-blue-600 bg-blue-50 py-1 dark:border-blue-400 dark:bg-blue-950',
          )}
          key={index}
        >
          <div className="flex h-8 w-full px-1">
            {schedule.events[mechanic.ci]?.events1 ? (
              <ContainsEvents color={mechanic.color} />
            ) : (
              <NoEvents
                mechanic={mechanic}
                time={selectTimeEvent1}
                onChange={onChange}
                selectMechanic={selectMechanic}
                selectTime={selectTime}
              />
            )}
          </div>

          <div className="flex h-8 w-full px-1">
            {schedule.events[mechanic.ci]?.events2 ? (
              <ContainsEvents color={mechanic.color} />
            ) : (
              <NoEvents
                mechanic={mechanic}
                time={selectTimeEvent2}
                onChange={onChange}
                selectMechanic={selectMechanic}
                selectTime={selectTime}
              />
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default TPItemMechanics
