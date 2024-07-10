'use client'
import { useParams } from 'next/navigation'

import AdminQuotesCreateView from '@/features/admin-quotes/presentation/views/create-view'
import QuotasCreateView from '@/features/quotes/presentation/views/create-view'
import ReviewsCreateView from '@/features/reviews/presentation/views/create-view'
import React, { FC } from 'react'

const Page: FC = () => {
  const { module } = useParams() as { module: string }

  const Views: Record<string, FC> = {
    quotes: QuotasCreateView,
    'admin-quotes': AdminQuotesCreateView,
    reviews: ReviewsCreateView,
  }

  const SelectedView = Views[module] || (() => <div>Module not found</div>)

  return <div>{<SelectedView />}</div>
}

export default Page
