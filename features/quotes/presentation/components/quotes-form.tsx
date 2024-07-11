'use client'

import React from 'react'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import RHFDatePicker from '@/components/ui/rhf/RHFDatePicker'
import RHFInput from '@/components/ui/rhf/RHFInput'
import { TimePicker12Demo } from '@/components/ui/time-picker-12h'

import { useQuotesForm } from '../../hooks/use-quotes-form'

const QuotesForm = () => {
  const { methods, onSubmit, isSubmitting } = useQuotesForm()

  const renderDateDetails = () => {
    return (
      <div className="mb-2">
        <RHFDatePicker name="date" label="Fecha" />
        <div className="pt-2">
          <TimePicker12Demo
            date={methods.watch('time') ? new Date(methods.watch('time')) : undefined}
            setDate={(date) => methods.setValue('time', date?.toISOString() as string)}
          />
        </div>
      </div>
    )
  }

  const renderClientDetails = () => {
    return (
      <div className="mb-2">
        <RHFInput name="dni" label="Cédula" />
        <RHFInput name="name" label="Nombre" />
        <RHFInput name="surname" label="Apellido" />
      </div>
    )
  }

  const renderVehicleDetails = () => {
    return (
      <div className="mb-2">
        <RHFInput name="vehicleType" label="Tipo de vehículo" />
        <RHFInput name="plate" label="Placa" />
        <RHFInput name="description" label="Descripción" />
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
          <h2 className="text-lg font-semibold">Detalles del Cliente:</h2>
          <p className="font-sm mt-1 text-xs">Datos generales del cliente que solicita la cita.</p>
        </div>
        {renderClientDetails()}
        <div>
          <h2 className="text-lg font-semibold">Detalles del Vehículo:</h2>
          <p className="font-sm mt-1 text-xs">Información del vehículo que se llevará a la cita.</p>
        </div>
        {renderVehicleDetails()}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? <LoadingSpinner /> : 'Guardar'}
        </Button>
      </form>
    </FormProvider>
  )
}

export default QuotesForm
