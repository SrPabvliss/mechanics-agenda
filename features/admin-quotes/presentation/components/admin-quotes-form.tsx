import React from 'react'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import RHFDatePicker from '@/components/ui/rhf/RHFDatePicker'
import RHFInput from '@/components/ui/rhf/RHFInput'
import RHFTextArea from '@/components/ui/rhf/RHFTextArea'
import RHFTimePicker from '@/components/ui/rhf/RHFTimePicker'

import { useAdminQuotesForm } from '../../hooks/use-admin-quotes-form'

const AdminQuotesForm: React.FC = () => {
  const { methods, onSubmit } = useAdminQuotesForm()

  const renderDateDetails = () => {
    return (
      <div className="mb-2 md:flex md:items-center md:gap-4">
        <RHFDatePicker name="date" label="Fecha" />
        <RHFTimePicker name="time" label="Hora" />
      </div>
    )
  }

  const renderAdditionalDetails = () => {
    return (
      <div className="mb-2">
        <RHFInput name="title" label="Título" />
        <RHFTextArea name="description" label="Descripción" />
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form className="mt-2 flex flex-col gap-2" onSubmit={onSubmit}>
        <div>
          <h2 className="text-lg font-semibold">Detalles de Fecha y Hora:</h2>
          <p className="font-sm mt-1 text-xs">Selecciona la fecha y hora en la que se agendará la cita.</p>
        </div>
        {renderDateDetails()}
        <div>
          <h2 className="text-lg font-semibold">Detalles adicionales:</h2>
          <p className="font-sm mt-1 text-xs">Ingresa el título y descripción de la cita administrativa.</p>
        </div>
        {renderAdditionalDetails()}

        <Button disabled={methods.formState.isSubmitting} type="submit">
          {methods.formState.isSubmitting ? <LoadingSpinner /> : 'Crear cita administrativa'}
        </Button>
      </form>
    </FormProvider>
  )
}

export default AdminQuotesForm
