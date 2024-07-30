import { IUser } from '@/features/users/models/IUser'
import { IScheduleMechanic } from '@/shared/interfaces/ISchedule'
import React from 'react'

import { cn } from '@/lib/utils'

import ContainsEvents from './contains-events'
import NoEvents from './no-events'
import { isDefaultValues } from './time-picker-dialog'

interface TPItemMechanicsProps {
  schedule: IScheduleMechanic
  mechanics: IUser[]
  onChange: (selectTime: string, selectMechanic: IUser) => void
  selectTime?: string
  selectMechanic?: IUser
  defaultValues?: { selectTime: string; selectMechanic: IUser; date: Date }
  currentDate: Date
}

const TPItemMechanics: React.FC<TPItemMechanicsProps> = ({
  mechanics,
  onChange,
  schedule,
  selectMechanic,
  selectTime,
  defaultValues,
  currentDate,
}) => {
  const selectTimeEvent1 = schedule.hour
  const selectTimeEvent2 = schedule.hour.split(':')[0] + ':30'

  const renderEvent = (mechanic: IUser, time: string, event: boolean) => {
    const isDefault = isDefaultValues({
      selectTime: time,
      defaultValues,
      selectMechanicCI: mechanic.ci,
      date: currentDate,
    })

    if (event && !isDefault) {
      return <ContainsEvents color={mechanic.color || '#E0E0E0'} />
    }

    return (
      <NoEvents
        mechanic={mechanic}
        time={time}
        onChange={onChange}
        selectMechanic={selectMechanic}
        selectTime={selectTime}
      />
    )
  }

  return (
    <>
      <span className=" w-full text-center text-xs text-blue-900 dark:text-white md:text-sm">{schedule.hour}</span>
      {mechanics.map((mechanic, index) => {
        return (
          <div
            className={cn(
              'flex w-full flex-col gap-1 border-l-[1.5px] border-t-[1.5px] border-dashed border-blue-600 bg-blue-50 py-1 dark:border-blue-400 dark:bg-blue-950',
            )}
            key={index}
          >
            <div className="flex h-8 w-full px-1">
              {renderEvent(mechanic, selectTimeEvent1, schedule.events[mechanic.ci]?.events1)}
            </div>

            <div className="flex h-8 w-full px-1">
              {renderEvent(mechanic, selectTimeEvent2, schedule.events[mechanic.ci]?.events2)}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TPItemMechanics
