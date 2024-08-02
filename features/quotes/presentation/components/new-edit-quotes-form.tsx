'use client'

import { useRouter } from 'next/navigation'

import { Ban } from 'lucide-react'
import React from 'react'
import { FormProvider } from 'react-hook-form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import RHFDatePicker from '@/components/ui/rhf/RHFDatePicker'
import RHFInput from '@/components/ui/rhf/RHFInput'
import RHFTextArea from '@/components/ui/rhf/RHFTextArea'
import RHFTimePickerByMechanic from '@/components/ui/rhf/RHFTimePickerByMechanic'

import { useQuotesForm } from '../../hooks/use-quotes-form'
import { IApiQuote } from '../../models/IApiQuote'

interface NewEditQuotesFormProps {
  currentQuote?: IApiQuote
}

const NewEditQuotesForm = ({ currentQuote }: NewEditQuotesFormProps) => {
  const { methods, onSubmit, isSubmitting } = useQuotesForm({ currentQuote })

  const router = useRouter()

  const renderDateDetails = () => {
    return (
      <div className="mb-2 md:flex  md:gap-4">
        <RHFDatePicker name="date" label="Fecha" />
        <RHFTimePickerByMechanic name="timeAndResponsible" label="Hora y encargado" />
      </div>
    )
  }

  const renderDetails = () => {
    return (
      <div className="mb-2">
        <RHFInput name="client" label="Cliente" />
        <div className="md:flex md:gap-4">
          <RHFInput name="vehicleType" label="Tipo de vehículo" />
        </div>
        <RHFTextArea name="description" label="Descripción" />
      </div>
    )
  }

  const renderAlertErrors = () => {
    return (
      <Alert variant={'destructive'}>
        <Ban className="h-4 w-4" />
        <AlertTitle>Errores en el formulario</AlertTitle>
        <AlertDescription>Intenta nuevamente o contacta a soporte.</AlertDescription>
      </Alert>
    )
  }

  const isEdit = !!currentQuote

  return (
    <FormProvider {...methods}>
      <form className="mt-2 flex flex-col gap-2" onSubmit={onSubmit}>
        <div>
          <h2 className="text-lg font-semibold">Programación de la Cita:</h2>
          <p className="font-sm mt-1 text-xs">Selecciona la fecha, la hora y el encargado para agendar la cita.</p>
        </div>
        {renderDateDetails()}
        <div>
          <h2 className="text-lg font-semibold">Detalles generales:</h2>
          <p className="font-sm mt-1 text-xs">Ingresa la información del cliente, vehículo y descripción de la cita.</p>
        </div>
        {renderDetails()}
        {methods.formState.errors && renderAlertErrors()}
        <div className="mt-4 flex gap-4">
          <Button variant="outline" onClick={() => router.back()} type="button">
            Regresar
          </Button>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? <LoadingSpinner /> : isEdit ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default NewEditQuotesForm
