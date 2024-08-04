import { useRouter } from 'next/navigation'

import { REVIEW_STATUS } from '@/features/reviews/models/IApiReview'
import ConfirmationDialog from '@/shared/components/confirmation-dialog'
import React from 'react'

import { Button } from '@/components/ui/button'

import { useJobMethods } from '../../hooks/use-job-methods'

interface Props {
  status: REVIEW_STATUS
  isFetching: boolean
}

export const ReviewActions = ({ status, isFetching }: Props) => {
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
        description="Una vez marcadas como finalizadas, los trabajos no podrán ser editadas. ¿Deseas continuar?"
        triggerLabel="Finalizar"
        disabled={status === REVIEW_STATUS.COMPLETED || isFetching}
        disabledLabel={isFetching ? 'Cargando ...' : 'Finalizado'}
      />
    </div>
  )
}
