import { useRouter } from 'next/navigation'

import React from 'react'

import { Button } from '@/components/ui/button'

export const ReviewsCreateView = () => {
  const router = useRouter()
  return (
    <>
      <div>ReviewsCreateView</div>
      <Button onClick={() => router.back()}>Volver</Button>
    </>
  )
}

export default ReviewsCreateView
