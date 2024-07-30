import { IQuoteEvent, IAdminQuoteEvent, IReviewEvent, IEvent } from '@/shared/interfaces/IEvents'
import { Clock, User } from 'lucide-react'
import React from 'react'

import { AutosizeTextarea } from '@/components/ui/autosize-textarea'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { getPlateAndTitle } from '@/lib/get-plate-title'

interface ReviewEventDetailsProps<T extends IEvent = IEvent> {
  event: T
  onClose: () => void
  onEdit: (id: number) => void
}

const QuoteEventDetails: React.FC<ReviewEventDetailsProps<IQuoteEvent>> = ({ event, onClose, onEdit }) => (
  <>
    <DialogHeader className="mb-4">
      <DialogTitle className="text-start">
        <p className="text-lg font-bold">{event.title}</p>
      </DialogTitle>
    </DialogHeader>
    <div className={`mb-4 h-2 w-full rounded-full ${event.color}`}></div>
    <div className="mt-1 flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex flex-1 items-center gap-2">
          <User size={24} />
          <span>{event.label}</span>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Clock size={24} />
          <span>{`${event.startTime}}`}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Regresar
        </Button>
        <Button onClick={() => onEdit(event.id)}>Editar</Button>
      </div>
    </div>
  </>
)

const AdminQuoteEventDetails: React.FC<ReviewEventDetailsProps<IAdminQuoteEvent>> = ({ event, onClose, onEdit }) => (
  <>
    <DialogHeader className="mb-4">
      <DialogTitle className="text-start">
        <p className="text-lg font-bold">{event.title}</p>
      </DialogTitle>
    </DialogHeader>
    <div className={`mb-4 h-2 w-full rounded-full ${event.color}`}></div>
    <div className="mt-1 flex flex-col gap-4">
      <div className="flex flex-1 items-center gap-2">
        <Clock size={24} />
        <span>{event.startTime}</span>
      </div>
      <AutosizeTextarea value={event.label} disabled />

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Regresar
        </Button>
        <Button onClick={() => onEdit(event.id)}>Editar</Button>
      </div>
    </div>
  </>
)

const ReviewEventDetails: React.FC<ReviewEventDetailsProps<IReviewEvent>> = ({ event, onClose, onEdit }) => {
  const { newTitle, plate } = getPlateAndTitle(event.title)
  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle>
          <div
            className={`flex ${newTitle.length > 18 ? 'flex-col justify-center' : 'flex-row '} items-center gap-2 md:flex-row md:gap-6`}
          >
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold">{newTitle}</p>
            </div>
            {plate && (
              <Badge variant="outline" className="flex w-1/4 justify-center p-2">
                {plate}
              </Badge>
            )}
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className={`mb-4 h-2 w-full rounded-full ${event.color}`}></div>
      <div className="mt-1 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-1 items-center gap-2">
            <User size={24} />
            <span>{event.owner}</span>
          </div>
          <div className="flex flex-1 items-center gap-2">
            <Clock size={24} />
            <span>{event.startTime}</span>
          </div>
        </div>
        <AutosizeTextarea value={event.description} disabled />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Regresar
          </Button>
          <Button onClick={() => onEdit(event.id)}>Acceder a la Revisión</Button>
        </div>
      </div>
    </>
  )
}

export { QuoteEventDetails, AdminQuoteEventDetails, ReviewEventDetails }
