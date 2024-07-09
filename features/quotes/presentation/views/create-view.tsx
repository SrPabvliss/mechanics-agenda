import { useRouter } from 'next/navigation'

import React from 'react'

import { Button } from '@/components/ui/button'

const QuotasCreateView = () => {
  const router = useRouter()
  return (
    <>
      <div>QuotasCreateView</div>
      <Button onClick={() => router.back()}>Volver</Button>
    </>
  )
}

export default QuotasCreateView
