import React from 'react'

import { DatePicker } from './date-picker'
import { ReviewsTab } from './list/reviews-tab'

const ReviewDay = ({ date, type }: { date: string; type: string }) => {
  return (
    <>
      <DatePicker value={date} />
      <ReviewsTab type={type} />
    </>
  )
}

export default ReviewDay
