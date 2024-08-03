import React from 'react'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import RHFInput from '@/components/ui/rhf/RHFInput'

import { useJobMethods } from '../../hooks/use-job-methods'

export const CreateJobForm = ({ isFetching }: { isFetching: boolean }) => {
  const { methods, handleSubmit, isSubmitting, isValid } = useJobMethods()

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          handleSubmit(e)
          methods.reset()
        }}
      >
        <div className="flex items-end gap-4">
          <RHFInput name="name" disabled={isSubmitting} />
          <Button type="submit" className="flex-1" disabled={isSubmitting || !isValid || isFetching}>
            {isSubmitting ? <LoadingSpinner /> : 'Agregar'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
