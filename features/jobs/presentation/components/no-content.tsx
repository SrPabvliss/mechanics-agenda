import Image from 'next/image'

import JobsNoContent from '@/public/jobs-no-content.webp'

export function NoContent() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg  p-8 shadow-md">
      <Image src={JobsNoContent.src} alt="No Content" width={200} height={200} className="mb-4" loading="lazy" />
      <h2 className="text-xl font-semibold ">No hay actividades disponibles</h2>
      <p className="mt-2 text-center text-sm font-light">Aquí se mostrarán las actividades que se han agendado.</p>
    </div>
  )
}
