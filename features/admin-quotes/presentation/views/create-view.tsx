import { useRouter } from 'next/navigation'

import React from 'react'

import { Button } from '@/components/ui/button'

export const AdminQuotesCreateView = () => {
  const router = useRouter()
  return (
    <>
      <div>AdminQuotesCreateView</div>
      <Button onClick={() => router.back()}>Volver</Button>
    </>
  )
}

export default AdminQuotesCreateView
