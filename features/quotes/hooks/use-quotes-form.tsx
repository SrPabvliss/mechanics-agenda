import { useRouter } from 'next/navigation'

import { agendaColorOptions } from '@/shared/constants/color-options'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

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

const quotesSchema = z.object({
  id: z.number().optional(),
  date: z.date({ required_error: 'La fecha es requerida' }),
  timeAndResponsible: timeAndResponsibleSchema,
  client: z.string().min(1, 'El cliente es requerido'),
  vehicleType: z.string().min(1, 'El tipo de vehículo es requerido'),
  description: z.string().optional(),
})

export type QuotesFormValues = z.infer<typeof quotesSchema>

interface UseQuotesFormProps {
  currentQuote?: IApiQuote
}

export const useQuotesForm = ({ currentQuote }: UseQuotesFormProps) => {
  const router = useRouter()
  //const pathname = usePathname()

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
    },
  })

  const onSubmit: SubmitHandler<QuotesFormValues> = async (data) => {
    if (currentQuote) {
      const updateQuote = await QuotesDatasourceImpl.getInstance().update(
        currentQuote.id,
        QuotesAdapter.updateQuoteAdapter(data),
      )
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
