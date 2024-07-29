import { useRouter } from 'next/navigation'

import ConfirmationDialog from '@/shared/components/confirmation-dialog'
import React from 'react'

import { Button } from '@/components/ui/button'

import { useJobMethods } from '../../hooks/use-job-methods'

export const ReviewActions = () => {
  const router = useRouter()
  const { handleCloseReview } = useJobMethods()
  return (
    <div className="mt-4 flex gap-4">
      <Button variant="outline" onClick={() => router.back()}>
        Regresar
      </Button>
      <ConfirmationDialog
        onConfirm={handleCloseReview}
        title="Confirmar finalización"
        description="Una vez marcadas como finalizadas, las actividades no podrán ser editadas. ¿Deseas continuar?"
        triggerLabel="Finalizar"
      />
    </div>
  )
}
