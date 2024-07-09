'use client'
import { useParams } from 'next/navigation'

import AdminQuotesEditView from '@/features/admin-quotes/presentation/views/edit-view'
import QuotesEditView from '@/features/quotes/presentation/views/edit-view'
import ReviewsEditView from '@/features/reviews/presentation/views/edit-view'
import React, { FC } from 'react'

interface EditViewProps {
  id: string
}

const Page: FC = () => {
  const { module, id } = useParams() as { module: string; id: string }

  const Views: Record<string, FC<EditViewProps>> = {
    quotes: QuotesEditView,
    'admin-quotes': AdminQuotesEditView,
    reviews: ReviewsEditView,
  }

  const SelectedView = Views[module] || (() => <div>Module not found</div>)

  return <div>{<SelectedView id={id} />}</div>
}

export default Page
