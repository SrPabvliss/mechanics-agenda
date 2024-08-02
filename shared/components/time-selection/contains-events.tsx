import { Ban } from 'lucide-react'
import React from 'react'

interface ContainsEventsProps {
  color: string
}

const ContainsEvents: React.FC<ContainsEventsProps> = ({ color }) => {
  return (
    <div
      className={
        'flex w-full cursor-not-allowed flex-col items-center justify-center gap-0.5 rounded-md px-0.5 md:gap-1 md:px-1'
      }
      style={{ background: color }}
    >
      <Ban className="h-5 w-5 text-red-600" />
    </div>
  )
}

export default ContainsEvents
