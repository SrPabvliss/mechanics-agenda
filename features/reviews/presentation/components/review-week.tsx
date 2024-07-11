import CalendarWeek from '@/shared/components/calendar-week/calendar-week'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'
import { useState } from 'react'

import { reviewWeekAdapter } from '../../adapters/reviewAdapter'
import { reviewData } from '../../models/IApiReview'

const ReviewWeek = ({}: { value?: string }) => {
  const [schedule, setSchedule] = useState<IScheduleWeek[]>([])

  const onChange = async (date1: string, date2: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const startDate = new Date(date1)
    const endDate = new Date(date2)

    // Filtrar las revisiones que están entre las dos fechas
    const filter = reviewData.filter((review) => {
      const reviewDate = new Date(review.date)
      return reviewDate >= startDate && reviewDate <= endDate
    })

    setSchedule(reviewWeekAdapter(filter))
  }

  const onClick = (date: string) => {
    alert(`Clicked on ${date}`)
  }

  return <CalendarWeek onChange={onChange} onClick={onClick} schedule={schedule} />
}

export default ReviewWeek
