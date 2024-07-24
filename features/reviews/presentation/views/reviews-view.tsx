import { ContentLayout } from '@/core/layout/content/content-layout'
import { ViewButtons } from '@/shared/components/views-buttons'
import React from 'react'

import { useReviewsView } from '../../hooks/use-reviews-view'
import ReviewDay from '../components/review-day'
import ReviewMonth from '../components/review-month'
import ReviewWeek from '../components/review-week'

export const ReviewsView = () => {
  const { date, view, type } = useReviewsView()

  return (
    <>
      <ContentLayout title="Revisiones">
        <div className="flex flex-col gap-4">
          <ViewButtons view={view} />
          {view === 'day' && <ReviewDay date={date} type={type} />}
          {view === 'week' && <ReviewWeek value={date} />}
          {view === 'month' && <ReviewMonth />}
        </div>
      </ContentLayout>
    </>
  )
}
