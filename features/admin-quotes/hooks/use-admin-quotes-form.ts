import { useRouter } from 'next/navigation'

import { UseAccountStore } from '@/features/auth/context/use-account-store'
import { agendaColorOptions } from '@/shared/constants/color-options'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { formatTime } from '@/lib/formatTime'

import { AdminQuotesAdapter } from '../adapters/admin-quotes-adapter'
import { IApiAdminQuote } from '../models/IApiAdminQuotes'
import { AdminQuotesDatasourceImpl } from '../services/datasource'

const adminQuotesSchema = z.object({
  date: z.date({ required_error: 'La fecha es requerida' }),
  time: z.string().min(1, 'La hora es requerida'),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  color: z.string().min(1, 'El color es requerido'),
  notificationMinutesBefore: z.string().min(1, 'La notificación es requerida'),
  userCI: z.string().min(1, 'La cédula es requerida'),
})

export type AdminQuotesFormValues = z.infer<typeof adminQuotesSchema>

interface UseAdminQuotesForm {
  currentAdminQuote?: IApiAdminQuote
}

export const useAdminQuotesForm = ({ currentAdminQuote }: UseAdminQuotesForm) => {
  const { user } = UseAccountStore()
  const router = useRouter()

  const methods = useForm<AdminQuotesFormValues>({
    resolver: zodResolver(adminQuotesSchema),
    defaultValues: {
      date: currentAdminQuote?.reminderDate ? new Date(currentAdminQuote?.reminderDate) : undefined,
      time: currentAdminQuote?.reminderDate ? formatTime(currentAdminQuote.reminderDate) : '',
      title: currentAdminQuote?.title || '',
      description: currentAdminQuote?.description || '',
      color: currentAdminQuote?.color ? currentAdminQuote.color : agendaColorOptions[0].value,
      notificationMinutesBefore: currentAdminQuote?.notificationMinutesBefore?.toString() || '10',
      userCI: user?.ci || '',
    },
  })

  const onSubmit: SubmitHandler<AdminQuotesFormValues> = async (data) => {
    if (currentAdminQuote) {
      const updateAdminQuote = await AdminQuotesDatasourceImpl.getInstance().update(
        currentAdminQuote.id,
        AdminQuotesAdapter.updateAdminQuoteAdapter(data),
      )
      if (!updateAdminQuote) return
      router.push('/admin-quotes')
    } else {
      const createAdminQuote = await AdminQuotesDatasourceImpl.getInstance().create(
        AdminQuotesAdapter.createAdminQuoteAdapter(data),
      )
      if (!createAdminQuote) return
      router.push('/admin-quotes')
    }
  }

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  }
}
