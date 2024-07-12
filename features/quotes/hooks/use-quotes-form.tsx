import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

const quotesSchema = z.object({
  date: z.date({ required_error: 'La fecha es requerida' }),
  time: z.string().nonempty('La hora es requerida'),
  name: z.string().nonempty('El nombre es requerido'),
  surname: z.string().nonempty('El apellido es requerido'),
  dni: z.string().nonempty('La cédula es requerida'),
  vehicleType: z.string().nonempty('El tipo de vehículo es requerido'),
  plate: z.string().nonempty('La placa es requerida'),
  description: z.string().optional(),
  color: z.string().nonempty('El color es requerido'),
})

type QuotesFormValues = z.infer<typeof quotesSchema>

export const useQuotesForm = () => {
  const methods = useForm<QuotesFormValues>({
    resolver: zodResolver(quotesSchema),
    defaultValues: {
      date: new Date(),
      time: '10:00 AM',
      name: '',
      surname: '',
      dni: '',
      vehicleType: '',
      plate: '',
      description: '',
      color: '',
    },
  })

  const onSubmit: SubmitHandler<QuotesFormValues> = (data) => {
    console.log(data)
  }

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
    isSubmitting: methods.formState.isSubmitting,
    isValid: methods.formState.isValid,
  }
}
