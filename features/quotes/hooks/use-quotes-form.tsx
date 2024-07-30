import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { QuotesAdapter } from '../adapters/quotes-adapter'
import { QuotesDatasourceImpl } from '../services/datasource'

const timeAndResponsibleSchema = z.object({
  time: z.string().min(1, 'La hora es requerida'),
  responsible: z.string().min(1, 'El encargado es requerido'),
})

const quotesSchema = z.object({
  date: z.date({ required_error: 'La fecha es requerida' }),
  timeAndResponsible: timeAndResponsibleSchema,
  client: z.string().min(1, 'El cliente es requerido'),
  vehicleType: z.string().min(1, 'El tipo de vehículo es requerido'),
  description: z.string().optional(),
})

export type QuotesFormValues = z.infer<typeof quotesSchema>

export const useQuotesForm = () => {
  const router = useRouter()
  //const pathname = usePathname()

  const methods = useForm<QuotesFormValues>({
    resolver: zodResolver(quotesSchema),
    defaultValues: {
      date: undefined,
      timeAndResponsible: {
        time: '',
        responsible: '',
      },
      client: '',
      vehicleType: '',
      description: '',
    },
  })

  const onSubmit: SubmitHandler<QuotesFormValues> = async (data) => {
    const newQuote = await QuotesDatasourceImpl.getInstance().create(QuotesAdapter.createQuoteAdapter(data))
    if (!newQuote) return
    router.push('/quotes')
  }

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
    isSubmitting: methods.formState.isSubmitting,
    isValid: methods.formState.isValid,
  }
}
