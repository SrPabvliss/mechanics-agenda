import { useRouter } from 'next/navigation'

import { ContentLayout } from '@/core/layout/content/content-layout'
import React from 'react'

import { Button } from '@/components/ui/button'

export const ReviewsCreateView = () => {
  const router = useRouter()
  return (
    <>
      <ContentLayout title="Revisiones">
        <div>ReviewsCreateView</div>
        <Button onClick={() => router.back()}>Volver</Button>
      </ContentLayout>
    </>
  )
}

export default ReviewsCreateView
