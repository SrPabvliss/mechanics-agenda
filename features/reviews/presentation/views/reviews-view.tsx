import { usePathname, useRouter } from 'next/navigation'

import { ContentLayout } from '@/core/layout/content/content-layout'
import React from 'react'

import { Button } from '@/components/ui/button'

export const ReviewsView = () => {
  const router = useRouter()
  const newPath = `${usePathname()}/new`
  const editPath = `${usePathname()}/edit/1`

  return (
    <>
      <ContentLayout title="Revisiones">
        <div>ReviewsView</div>
        <Button onClick={() => router.push(newPath)}>Crear</Button>
        <Button onClick={() => router.push(editPath)}>Editar</Button>
      </ContentLayout>
    </>
  )
}
