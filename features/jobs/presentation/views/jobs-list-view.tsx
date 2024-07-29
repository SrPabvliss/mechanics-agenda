import { useRouter } from 'next/navigation'

import ConfirmationDialog from '@/shared/components/confirmation-dialog'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

import useJobsView from '../../hooks/use-jobs-view'
import { JobListItem } from '../components/job-list-item'

export const JobsListView = () => {
  const { jobs } = useJobsView()
  const router = useRouter()
  return (
    <div className="flex flex-col gap-4">
      {/* Encabezado del componente */}
      <div>
        <h2 className="font-semibold">Actividades</h2>
        <p className="font-sm mt-1 text-xs">Gestiona las actividades que se realizarán en la revisión.</p>
      </div>

      {/* Sección del formulario */}
      <div className="flex items-center gap-4">
        <Input placeholder="Ingresa una actividad" className="flex-2" />
        <Button type="button" className="flex-1">
          Agregar
        </Button>
      </div>

      {/* Lista de actividades */}
      {jobs && jobs.length > 0 ? (
        <ScrollArea className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </ScrollArea>
      ) : (
        <p>No hay actividades registradas</p>
      )}

      {/* Botón de finalizar */}
      <div className="mt-4 flex gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Regresar
        </Button>
        <ConfirmationDialog
          onConfirm={() => {}}
          title="Confirmar finalización"
          description="Una vez marcadas como finalizadas, las actividades no podrán ser editadas. ¿Deseas continuar?"
          triggerLabel="Finalizar"
        />
      </div>
    </div>
  )
}
