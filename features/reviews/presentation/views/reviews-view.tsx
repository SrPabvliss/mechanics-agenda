import { usePathname, useRouter } from 'next/navigation'

import React from 'react'

import { Button } from '@/components/ui/button'

export const ReviewsView = () => {
  const router = useRouter()
  const newPath = `${usePathname()}/new`
  const editPath = `${usePathname()}/edit/1`

  return (
    <>
      <div>ReviewsView</div>
      <Button onClick={() => router.push(newPath)}>Crear</Button>
      <Button onClick={() => router.push(editPath)}>Editar</Button>
    </>
  )
}
