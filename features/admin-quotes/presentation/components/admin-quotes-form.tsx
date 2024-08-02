import { useRouter } from 'next/navigation'

import { agendaColorOptions } from '@/shared/constants/color-options'
import { reminderOptions } from '@/shared/constants/reminder-options'
import React from 'react'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import RHFColorSelect from '@/components/ui/rhf/RHFColorSelect'
import RHFDatePicker from '@/components/ui/rhf/RHFDatePicker'
import RHFInput from '@/components/ui/rhf/RHFInput'
import RHFSelect from '@/components/ui/rhf/RHFSelect'
import RHFTextArea from '@/components/ui/rhf/RHFTextArea'
import RHFTimePicker from '@/components/ui/rhf/RHFTimePicker'

import { useAdminQuotesForm } from '../../hooks/use-admin-quotes-form'
import { IApiAdminQuote } from '../../models/IApiAdminQuotes'

interface AdminQuotesFormProps {
  currentAdminQuote?: IApiAdminQuote
}

const AdminQuotesForm: React.FC<AdminQuotesFormProps> = ({ currentAdminQuote }) => {
  const { methods, onSubmit } = useAdminQuotesForm({ currentAdminQuote })
  const router = useRouter()

  const renderDateDetails = () => {
    return (
      <div className="mb-2 md:flex md:gap-4">
        <RHFDatePicker name="date" label="Fecha" />
        <div className="w-full sm:flex sm:gap-4">
          <RHFTimePicker name="time" label="Hora" />
          <RHFSelect name="notificationMinutesBefore" label="Notificación" options={reminderOptions} />
        </div>
      </div>
    )
  }

  const renderAdditionalDetails = () => {
    return (
      <div className="mb-2">
        <div className="mb-2 md:flex md:gap-4">
          <RHFInput name="title" label="Título" />
          <RHFColorSelect name="color" label="Color" options={agendaColorOptions} placeholder="Seleciona el color" />
        </div>
        <RHFTextArea name="description" label="Descripción" />
      </div>
    )
  }

  const isEdit = !!currentAdminQuote

  return (
    <FormProvider {...methods}>
      <form className="mt-2 flex flex-col gap-2" onSubmit={onSubmit}>
        <div>
          <h2 className="text-lg font-semibold">Programación de la cita:</h2>
          <p className="font-sm mt-1 text-xs">Selecciona la fecha, hora y notificación de la cita administrativa</p>
        </div>
        {renderDateDetails()}
        <div>
          <h2 className="text-lg font-semibold">Detalles adicionales:</h2>
          <p className="font-sm mt-1 text-xs">Ingresa el título, color y descripción de la cita administrativa.</p>
        </div>
        {renderAdditionalDetails()}
        <div className="mt-4 flex gap-4">
          <Button variant="outline" onClick={() => router.back()} type="button">
            Regresar
          </Button>
          <Button disabled={methods.formState.isSubmitting} type="submit">
            {methods.formState.isSubmitting ? <LoadingSpinner /> : isEdit ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default AdminQuotesForm
