import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

const timeAndResponsibleSchema = z.object({
  time: z.string().min(1, 'La hora es requerida'),
  responsible: z.string().min(1, 'El encargado es requerido'),
})

const quotesSchema = z.object({
  date: z.date({ required_error: 'La fecha es requerida' }),
  timeAndResponsible: timeAndResponsibleSchema,
  client: z.string().min(1, 'El cliente es requerido'),
  vehicleType: z.string().min(1, 'El tipo de vehículo es requerido'),
  plate: z.string().optional(),
  description: z.string().optional(),
})

type QuotesFormValues = z.infer<typeof quotesSchema>

export const useQuotesForm = () => {
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
      plate: '',
      description: '',
    },
  })

  const onSubmit: SubmitHandler<QuotesFormValues> = (data) => {
    // eslint-disable-next-line no-console
    alert(JSON.stringify(data, null, 2))
  }

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
    isSubmitting: methods.formState.isSubmitting,
    isValid: methods.formState.isValid,
  }
}
