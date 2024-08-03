'use client'

import Image from 'next/image'
import Link from 'next/link'

import notFoundImage from '@/public/notFound.webp'

import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className=" flex flex-col items-center text-center">
        <Image src={notFoundImage} alt="404 Not Found" width={500} height={500} />
        <h1 className="mt-4 text-4xl font-bold text-primary">¡Vaya!</h1>
        <p className="mt-2 text-sm font-light ">La página que estás buscando no existe.</p>
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

export default NotFound
