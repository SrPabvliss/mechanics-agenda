'use client'

import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import RHFInput from '@/components/ui/rhf/RHFInput'
import RHFPasswordInput from '@/components/ui/rhf/RHFPasswordInput'

import { useAuth } from '../../hooks/use-auth-form'

const AuthForm = () => {
  const { methods, onSubmit, isSubmiting } = useAuth()

  return (
    <>
      <FormProvider {...methods}>
        <form className="flex flex-col items-center gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
          <RHFInput name="ci" label="Cédula" placeholder="Cédula" />
          <RHFPasswordInput name="password" label="Contraseña" placeholder="Contraseña" />
          <Button disabled={isSubmiting} type="submit">
            {isSubmiting ? <LoadingSpinner /> : 'Ingresar'}
          </Button>
        </form>
      </FormProvider>
    </>
  )
}

export default AuthForm
