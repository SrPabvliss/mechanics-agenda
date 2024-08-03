'use client'

import Image from 'next/image'
import Link from 'next/link'

import Unauthorized from '@/public/forbidden.webp'

import { Button } from '@/components/ui/button'

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center py-2">
      <div className=" flex flex-col items-center text-center">
        <Image src={Unauthorized.src} alt="Unauthorized" width={800} height={800} />
        <h1 className="mt-4 text-4xl font-bold text-primary">¡Alto ahí!</h1>
        <p className="mt-2 text-sm font-light">No tienes acceso a esta sección</p>
        <div className="w-3/4 ">
          <Link href="/" passHref>
            <Button className="mt-6" size={'default'}>
              Regresar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage
