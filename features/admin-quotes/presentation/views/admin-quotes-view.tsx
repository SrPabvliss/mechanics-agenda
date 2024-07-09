import { usePathname, useRouter } from 'next/navigation'

import React from 'react'

import { Button } from '@/components/ui/button'

export const AdminQuotesView = () => {
  const router = useRouter()
  const newPath = `${usePathname()}/new`
  const editPath = `${usePathname()}/edit/1`
  return (
    <>
      <div>AdminQuotesView</div>
      <Button onClick={() => router.push(newPath)}>Crear</Button>
      <Button onClick={() => router.push(editPath)}>Editar</Button>
    </>
  )
}
