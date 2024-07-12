import { useRouter } from 'next/navigation'

import React from 'react'

import { Button } from '@/components/ui/button'

export const QuotesEditView = ({ id }: { id: string }) => {
  const router = useRouter()
  return (
    <>
      <div>QuotesEditView id: {id}</div>
      <Button onClick={() => router.back()}>Volver</Button>
    </>
  )
}

export default QuotesEditView
