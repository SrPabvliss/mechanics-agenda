// components/EditFormDialog.tsx

import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { DialogDescription } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerTrigger } from '@/components/ui/drawer'
import RHFInput from '@/components/ui/rhf/RHFInput'

import { useJobMethods } from '../../hooks/use-job-methods'
import { IJob } from '../../models/IJob'

interface EditFormDialogProps {
  job: IJob
  children: React.ReactNode
}

export const EditFormDialog: React.FC<EditFormDialogProps> = ({ job, children }) => {
  const { id, ...rest } = job
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { methods, handleSubmit } = useJobMethods(rest, id)

  const formContent = (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          handleSubmit(e)
          setOpen(false)
        }}
        className="flex flex-col gap-4"
      >
        <RHFInput name="name" />
        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="w-full cursor-pointer">
          <div className="w-full">{children}</div>
        </DialogTrigger>
        <DialogDescription className="hidden">Editar actividad</DialogDescription>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Nombre de la actividad</DialogTitle>
          <div className="px-1">{formContent}</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="w-full">
        <div className="w-full">{children}</div>
      </DrawerTrigger>
      <DrawerDescription className="hidden">Editar actividad</DrawerDescription>
      <DrawerContent className="my-8 px-6">
        <DialogTitle className="mb-4 mt-8 text-center">Nombre de la actividad</DialogTitle>
        <div className="px-4 pb-6">{formContent}</div>
      </DrawerContent>
    </Drawer>
  )
}
