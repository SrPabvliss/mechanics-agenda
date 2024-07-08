// import { useRouter } from 'next/router'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(1, 'Usuario requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

type FormFields = z.infer<typeof schema>

export function useAuth() {
  // const router = useRouter()

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
  }

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting }
}
