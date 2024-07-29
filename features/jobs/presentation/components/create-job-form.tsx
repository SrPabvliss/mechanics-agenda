import React from 'react'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import RHFInput from '@/components/ui/rhf/RHFInput'

import { useJobMethods } from '../../hooks/use-job-methods'

export const CreateJobForm = () => {
  const { methods, handleSubmit } = useJobMethods()

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
          <RHFInput name="name" />
          <Button type="submit" className="flex-1">
            Agregar
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
