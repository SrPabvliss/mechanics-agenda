// import { ContentLayout } from '@/core/layout/content/content-layout'
// import { Calendar, Car, Clock } from 'lucide-react'
// import React from 'react'

// import { Badge } from '@/components/ui/badge'

// import useActivityView from '../../hooks/use-activities-view'
// import ActivitiesList from '../components/activities-list'

export const ReviewsEditView = ({ id }: { id: string }) => {
  console.log('ReviewsEditView', id)
  // const { review } = useActivityView({ id })

  return (
    <>
      {/* <ContentLayout title="Revisiones">
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-4">
            <h1 className="text-2xl font-semibold">{review?.car}</h1>
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
            <p>{review?.startTime}</p> - <p>{review?.endTime}</p>
          </div>
          <div className="flex items-center gap-2">
            <Car size={20} />
            <Badge variant="outline">{review?.plate}</Badge>
          </div>

          <div>
            <h2 className="font-semibold">Descripción</h2>
            <p className="mt-2 text-sm font-light">{review?.description}</p>
          </div>

          <ActivitiesList initialActivities={[]} />
        </div>
      </ContentLayout> */}
    </>
  )
}

export default ReviewsEditView
