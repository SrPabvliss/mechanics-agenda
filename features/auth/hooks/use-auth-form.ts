import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { UserDatasourceImpl } from '../services/Datasource'

const schema = z.object({
  ci: z.string().min(1, 'Usuario requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

type FormFields = z.infer<typeof schema>

export function useAuth() {
  const router = useRouter()

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      ci: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await UserDatasourceImpl.getInstance().login(data)
    router.push('/quotes')
  }

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting }
}
