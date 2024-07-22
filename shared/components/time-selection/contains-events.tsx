import React from 'react'

import { cn } from '@/lib/utils'

interface ContainsEventsProps {
  color: string
}

const ContainsEvents: React.FC<ContainsEventsProps> = ({ color }) => {
  return <div className={cn('flex w-full flex-col gap-0.5 rounded-md px-0.5 md:gap-1 md:px-1', color)}></div>
}

export default ContainsEvents
