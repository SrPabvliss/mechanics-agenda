'use client'
import { useParams } from 'next/navigation'

import { ContentLayout } from '@/core/layout/content/content-layout'
import { AdminQuotesView } from '@/features/admin-quotes/presentation/views/admin-quotes-view'
import { QuotesView } from '@/features/quotes/presentation/views/quotes-view'
import { ReviewsView } from '@/features/reviews/presentation/views/reviews-view'
import React, { FC } from 'react'

const Page: FC = () => {
  const { module } = useParams() as { module: string }

  const Views: Record<string, React.ComponentType> = {
    quotes: QuotesView,
    'admin-quotes': AdminQuotesView,
    reviews: ReviewsView,
  }

  const SelectedView =
    Views[module] ||
    (() => (
      <ContentLayout title="Not found">
        <div>Module not found</div>
      </ContentLayout>
    ))

  return <div>{<SelectedView />}</div>
}

export default Page
