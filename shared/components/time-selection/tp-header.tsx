import { IUser } from '@/shared/interfaces/IUser'
import React from 'react'

interface TPHeaderProps {
  mechanic: IUser
}

const TPHeader: React.FC<TPHeaderProps> = ({ mechanic }) => {
  return (
    <div className="flex flex-col truncate border-l-[1.5px] border-dashed border-blue-600 text-center text-xs text-blue-900 dark:border-blue-400 dark:text-white md:px-1 md:text-base">
      <span className="truncate">{mechanic.firstName}</span>
      <span className="truncate">{mechanic.lastName}</span>
    </div>
  )
}

export default TPHeader
