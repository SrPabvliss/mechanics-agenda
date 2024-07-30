import React from 'react'

interface ContainsEventsProps {
  color: string
}

const ContainsEvents: React.FC<ContainsEventsProps> = ({ color }) => {
  return (
    <div
      className={'flex w-full flex-col gap-0.5 rounded-md px-0.5 md:gap-1 md:px-1'}
      style={{ background: color }}
    ></div>
  )
}

export default ContainsEvents
