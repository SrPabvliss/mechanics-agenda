import Image from 'next/image'

import Logo from '@/public/GabMotorsLogo.png'
import React from 'react'

import AuthForm from '../components/auth-form'

export const LoginView = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Image src={Logo} alt="Gab Motors Logo" width={170} height={170} />
        <h1 className="text-2xl">Gab Motors Agenda</h1>
        <h2>Inicio de sesión</h2>
        <AuthForm />
      </div>
    </>
  )
}
