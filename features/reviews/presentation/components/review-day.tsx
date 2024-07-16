import React from 'react'

import { DatePicker } from './date-picker'
import { TabList } from './tab-list'

const ReviewDay = ({ date, type }: { date: string; type: string }) => {
  return (
    <>
      <DatePicker value={date} />
      <TabList type={type} />
    </>
  )
}

export default ReviewDay
