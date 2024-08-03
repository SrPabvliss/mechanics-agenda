'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { ContentLayout } from '@/core/layout/content/content-layout'
import { AdminQuotesView } from '@/features/admin-quotes/presentation/views/admin-quotes-view'
import { QuotesView } from '@/features/quotes/presentation/views/quotes-view'
import { ReviewsView } from '@/features/reviews/presentation/views/reviews-view'
import notFoundImage from '@/public/notFound.webp'
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
    return (
      <ContentLayout title="404">
        <div className="flex h-[calc(100vh_-_150px)] flex-col items-center justify-center">
          <Image src={notFoundImage} alt="404 Not Found" width={500} height={500} />
          <h1 className="mt-4 text-4xl font-bold text-primary">¡Vaya!</h1>
          <p className="mt-2 text-sm font-light ">La página que estás buscando no existe.</p>
        </div>
      </ContentLayout>
    )
  }

  return (
    <div>
      <SelectedView />
      {module !== 'reviews' && <AddButton />}
    </div>
  )
}

export default Page
