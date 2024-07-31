import Image from 'next/image'

import ReviewNoContent from '@/public/reviews-no-content.webp'

export function NoContent() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg  p-8 shadow-md">
      <Image src={ReviewNoContent.src} alt="No Content" width={200} height={200} className="mb-4" loading="lazy" />
      <h2 className="text-xl font-semibold ">No hay revisiones disponibles</h2>
      <p className="mt-2 text-center text-sm font-light">
        Parece que no se han agendado revisiones para el día de hoy.
      </p>
    </div>
  )
}
