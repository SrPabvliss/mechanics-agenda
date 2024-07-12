import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ConfirmationDialogProps {
  onConfirm: () => void
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onConfirm }) => {
  const [open, setOpen] = React.useState(false)

  const handleConfirm = () => {
    setOpen(false)
    onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Finalizar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-80 md:max-w-96">
        <DialogHeader>
          <DialogTitle>Confirmar finalización</DialogTitle>
          <DialogDescription>
            Una vez marcadas como finalizadas, las actividades no podrán ser editadas. ¿Deseas continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationDialog
