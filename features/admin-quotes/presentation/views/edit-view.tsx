import { useRouter } from 'next/navigation'

import React from 'react'

import { Button } from '@/components/ui/button'

export const AdminQuotesEditView = ({ id }: { id: string }) => {
  const router = useRouter()
  return (
    <>
      <div>AdminQuotesEditView id: {id}</div>
      <Button onClick={() => router.back()}>Volver</Button>
    </>
  )
}

export default AdminQuotesEditView
