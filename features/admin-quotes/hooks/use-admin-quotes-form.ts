import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const adminQuotesSchema = z.object({
  date: z.date({ required_error: 'La fecha es requerida' }),
  time: z.string().nonempty('La hora es requerida'),
  title: z.string().nonempty('El título es requerido'),
  description: z.string().optional(),
})

type AdminQuotesFormValues = z.infer<typeof adminQuotesSchema>

export const useAdminQuotesForm = () => {
  const methods = useForm<AdminQuotesFormValues>({
    resolver: zodResolver(adminQuotesSchema),
    defaultValues: {
      date: new Date(),
      time: '10:00 AM',
      title: '',
      description: '',
    },
  })

  const onSubmit = (data: AdminQuotesFormValues) => {
    console.log(data)
  }

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  }
}
