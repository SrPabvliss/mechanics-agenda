'use client'
import Image from 'next/image'

import Logo from '@/public/GabMotorsLogo.png'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { PasswordInput } from './password-input'

const AuthForm = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 ">
        <Image src={Logo} alt="Gab Motors Logo" width={170} height={170} />
        <h1 className="text-2xl">Gab Motors Agenda</h1>
        <h2>Inicio de sesión</h2>
        <div className="w-full">
          <Label htmlFor="username">Usuario</Label>
          <Input placeholder="Usuario" id="username" name="username" />
        </div>
        <div className="w-full">
          <Label htmlFor="password">Contraseña</Label>
          <PasswordInput id="password" name="password" placeholder="Contraseña" />
        </div>

        <Button>Ingresar</Button>
      </div>
    </>
  )
}

export default AuthForm
