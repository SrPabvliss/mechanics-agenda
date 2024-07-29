import { ContentLayout } from '@/core/layout/content/content-layout'
import { JobsListView } from '@/features/jobs/presentation/views/jobs-list-view'
import { Calendar, Car, Clock } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'

import { getPlateAndTitle } from '@/lib/get-plate-title'

import useEditReviewView from '../../hooks/use-edit-review-view'

export const ReviewsEditView = ({ id }: { id: string }) => {
  const { review } = useEditReviewView({ id })

  const carInfo = review && getPlateAndTitle(review?.title)

  return (
    <>
      <ContentLayout title="Revisiones">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">{carInfo?.newTitle}</h1>
            <Badge variant={review?.status === 'completed' ? 'default' : 'outline'}>
              {review?.status === 'completed' ? 'Completado' : 'Pendiente'}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={20} />
            <p>{review?.date}</p>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={20} />
            <p>{review?.startTime}</p> <p>{review?.endTime ? ` - ${review.endTime}` : ''}</p>
          </div>
          {carInfo?.plate && (
            <div className="flex items-center gap-2">
              <Car size={20} />
              <Badge variant="outline">{carInfo.plate}</Badge>
            </div>
          )}

          <div>
            <h2 className="font-semibold">Descripción</h2>
            <p className="mt-2 text-sm font-light">{review?.description}</p>
          </div>

          <JobsListView />
        </div>
      </ContentLayout>
    </>
  )
}

export default ReviewsEditView
