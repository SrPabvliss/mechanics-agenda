import { IUser } from '@/features/users/models/IUser'
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
  return isLunchTime ? (
    <></>
  ) : (
    <button
      className={cn(
        'flex h-full w-full items-center justify-center rounded-md border border-blue-400 text-blue-900 hover:bg-blue-200 dark:text-white  dark:hover:bg-blue-900',
        isSelect && 'bg-blue-600 text-white dark:bg-blue-700',
      )}
      onClick={() => onChange(time, mechanic)}
    >
      <Plus className="h-4 w-4" />
    </button>
  )
}

export default NoEvents
