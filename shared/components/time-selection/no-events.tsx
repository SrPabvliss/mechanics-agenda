import { IUser } from '@/features/users/models/IUser'

import Color from 'color'
import { Plus } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'
import { validLunchTime } from '@/lib/validLunchTime'

interface NoEventsProps {
  mechanic: IUser
  time: string
  onChange: (selectTime: string, selectMechanic: IUser) => void
  selectTime?: string
  selectMechanic?: IUser
}

const NoEvents: React.FC<NoEventsProps> = ({ mechanic, onChange, time, selectMechanic, selectTime }) => {
  const isSelect = selectTime === time && selectMechanic?.ci === mechanic.ci
  const isLunchTime = validLunchTime(time)

  const darkerHexColor = Color(mechanic.color).darken(0.3).hex()
  return isLunchTime ? (
    <></>
  ) : (
    <button
      className={cn(
        'flex h-full w-full items-center justify-center rounded-md border border-blue-400 text-blue-900 hover:bg-blue-200 dark:text-white dark:hover:bg-blue-900',
      )}
      style={{ backgroundColor: isSelect ? darkerHexColor : '' }}
      onClick={() => onChange(time, mechanic)}
    >
      <Plus className={cn('h-4 w-4', { 'text-white': isSelect })} />
    </button>
  )
}

export default NoEvents
