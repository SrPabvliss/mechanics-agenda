import { useRouter } from 'next/navigation'

import { agendaColorOptions } from '@/shared/constants/color-options'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { formatDateTime } from '@/lib/formatDate'
import { formatTime } from '@/lib/formatTime'

import { QuotesAdapter } from '../adapters/quotes-adapter'
import { IApiQuote } from '../models/IApiQuote'
import { QuotesDatasourceImpl } from '../services/datasource'

const timeAndResponsibleSchema = z.object({
  time: z.string().min(1, 'La hora es requerida'),
  responsible: z.object({
    ci: z.string().min(1, 'El responsable es requerido'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.string().optional(),
    color: z.string().optional(),
  }),
})

const defaultDataTime = z.object({
  defaultTime: z.string().optional(),
  defaultResponsible: z.object({
    ci: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.string().optional(),
    color: z.string().optional(),
  }),
  defaultDate: z.date().optional(),
})

const quotesSchema = z.object({
  id: z.number().optional(),
  date: z.date({ required_error: 'La fecha es requerida' }),
  timeAndResponsible: timeAndResponsibleSchema,
  client: z.string().min(1, 'El cliente es requerido').max(30, 'El cliente no puede tener más de 30 caracteres'),
  vehicleType: z
    .string()
    .min(1, 'El tipo de vehículo es requerido')
    .max(50, 'El tipo de vehículo no puede tener más de 50 caracteres'),
  description: z.string().optional(),
  defaultDataTime: defaultDataTime.optional(),
})

export type QuotesFormValues = z.infer<typeof quotesSchema>

interface UseQuotesFormProps {
  currentQuote?: IApiQuote
}
const changedFields = (currentQuote: IApiQuote, updateQuote: Partial<IApiQuote>): Partial<IApiQuote> => {
  //change fields
  const changedFields: Partial<IApiQuote> = {}
  if (formatDateTime(currentQuote.date) !== updateQuote.date) {
    changedFields.date = updateQuote.date
  }
  if (currentQuote.clientName !== updateQuote.clientName) {
    changedFields.clientName = updateQuote.clientName
  }
  if (currentQuote.vehicleDescription !== updateQuote.vehicleDescription) {
    changedFields.vehicleDescription = updateQuote.vehicleDescription
  }
  if (currentQuote.description !== updateQuote.description) {
    changedFields.description = updateQuote.description
  }
  if (currentQuote.userCI !== updateQuote.userCI) {
    changedFields.userCI = updateQuote.userCI
  }
  return changedFields
}

export const useQuotesForm = ({ currentQuote }: UseQuotesFormProps) => {
  const router = useRouter()

  const methods = useForm<QuotesFormValues>({
    resolver: zodResolver(quotesSchema),
    defaultValues: {
      id: currentQuote?.id || undefined,
      date: currentQuote?.date ? new Date(currentQuote.date) : undefined,
      timeAndResponsible: {
        time: currentQuote?.date ? formatTime(currentQuote.date) : '',
        responsible: {
          ci: currentQuote?.user?.ci || '',
          firstName: currentQuote?.user?.firstName || '',
          lastName: currentQuote?.user?.lastName || '',
          role: currentQuote?.user?.role || '',
          color: currentQuote?.user?.color || agendaColorOptions[0].value,
        },
      },
      client: currentQuote?.clientName || '',
      vehicleType: currentQuote?.vehicleDescription || '',
      description: currentQuote?.description || '',
      defaultDataTime: {
        defaultTime: currentQuote?.date ? formatTime(currentQuote.date) : '',
        defaultResponsible: {
          ci: currentQuote?.user?.ci || '',
          firstName: currentQuote?.user?.firstName || '',
          lastName: currentQuote?.user?.lastName || '',
          role: currentQuote?.user?.role || '',
          color: currentQuote?.user?.color || agendaColorOptions[0].value,
        },
        defaultDate: currentQuote?.date ? new Date(currentQuote.date) : undefined,
      },
    },
  })

  const onSubmit: SubmitHandler<QuotesFormValues> = async (data) => {
    if (currentQuote) {
      const updateQuoteAdapter = QuotesAdapter.updateQuoteAdapter(data)
      const fields = changedFields(currentQuote, updateQuoteAdapter)
      if (Object.keys(fields).length === 0) {
        toast.error('No se ha modificado ningún campo')
        return
      }
      const updateQuote = await QuotesDatasourceImpl.getInstance().update(currentQuote.id, fields)
      if (!updateQuote) return
      router.back()
    } else {
      const createQuote = await QuotesDatasourceImpl.getInstance().create(QuotesAdapter.createQuoteAdapter(data))
      if (!createQuote) return
      router.back()
    }
  }

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
    isSubmitting: methods.formState.isSubmitting,
    isValid: methods.formState.isValid,
  }
}
