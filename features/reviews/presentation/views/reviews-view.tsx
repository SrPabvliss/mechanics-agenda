import { ContentLayout } from '@/core/layout/content/content-layout'
import { ViewButtons } from '@/shared/components/views-buttons'
import { VIEW_TYPES } from '@/shared/constants/view-types'
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
          {view === VIEW_TYPES.DAY && <ReviewDay date={date} type={type} />}
          {view === VIEW_TYPES.WEEK && <ReviewWeek value={date} />}
          {view === VIEW_TYPES.MONTH && <ReviewMonth />}
        </div>
      </ContentLayout>
    </>
  )
}
