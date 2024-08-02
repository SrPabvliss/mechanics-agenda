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
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  triggerLabel: React.ReactNode
  disabled?: boolean
  disabledLabel?: string
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
  roundedFull?: boolean
}

const ConfirmationDialog = React.forwardRef<HTMLButtonElement, ConfirmationDialogProps>(
  (
    {
      onConfirm,
      title,
      description,
      confirmLabel = 'Confirmar',
      cancelLabel = 'Cancelar',
      triggerLabel,
      disabled = false,
      disabledLabel,
      variant = 'default',
      size = 'default',
      roundedFull: r = false,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false)

    const handleConfirm = () => {
      setOpen(false)
      onConfirm()
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            ref={ref}
            disabled={disabled}
            variant={variant}
            size={size}
            className={`${r ? 'rounded-full' : 'rounded-md'}`}
          >
            {disabled ? disabledLabel : triggerLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-80 md:max-w-96">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {cancelLabel}
            </Button>
            <Button onClick={handleConfirm}>{confirmLabel}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)

ConfirmationDialog.displayName = 'ConfirmationDialog'

export default ConfirmationDialog
