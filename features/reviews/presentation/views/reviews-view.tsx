import { ContentLayout } from '@/core/layout/content/content-layout'
import { DatePicker } from '@/features/reviews/presentation/components/date-picker'
import React from 'react'

import { useReviewsView } from '../../hooks/use-reviews-view'
import ReviewWeek from '../components/review-week'
import { TabList } from '../components/tab-list'
import { ViewButtons } from '../components/views-buttons'

export const ReviewsView = () => {
  const { date, view, type } = useReviewsView()

  return (
    <>
      <ContentLayout title="Revisiones">
        <div className="flex flex-col gap-4">
          <ViewButtons view={view} />
          {view === 'day' && <DatePicker value={date} />}
          {view === 'day' && <TabList type={type} />}
          {view === 'week' && <ReviewWeek value={date} />}
        </div>
      </ContentLayout>
    </>
  )
}
