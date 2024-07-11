'use client'
import { useParams } from 'next/navigation'

import { ContentLayout } from '@/core/layout/content/content-layout'
import { AdminQuotesView } from '@/features/admin-quotes/presentation/views/admin-quotes-view'
import { QuotesView } from '@/features/quotes/presentation/views/quotes-view'
import { ReviewsView } from '@/features/reviews/presentation/views/reviews-view'
import AddButton from '@/shared/components/add-button'
import React, { FC } from 'react'

const Page: FC = () => {
  const { module } = useParams() as { module: string }

  const Views: Record<string, React.ComponentType> = {
    quotes: QuotesView,
    'admin-quotes': AdminQuotesView,
    reviews: ReviewsView,
  }

  const SelectedView = Views[module]

  if (!SelectedView) {
    return <ContentLayout title="404">Module not found</ContentLayout>
  }

  return (
    <div>
      <SelectedView />
      <AddButton />
    </div>
  )
}

export default Page
