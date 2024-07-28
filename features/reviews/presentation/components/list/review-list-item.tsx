import { DetailsDialog } from '@/shared/components/details-dialog'
import { IReviewEvent } from '@/shared/interfaces/IEvents'
import { Clock, User } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { getPlateAndTitle } from '@/lib/get-plate-title'

interface Props {
  review: IReviewEvent
}

export const ReviewListItem = ({ review }: Props) => {
  const { plate, newTitle } = getPlateAndTitle(review.title)

  return (
    <>
      <DetailsDialog key={review.id} item={review}>
        <Card className="relative">
          <CardContent className="mt-4 flex flex-col items-start gap-2">
            <div
              className={`absolute bottom-4 right-4 top-4 w-14 rounded-md border-2`}
              style={{ backgroundColor: review.color }}
            />
            <div className={`flex items-center gap-2 md:flex-row md:gap-6`}>
              <div className="flex flex-col gap-2">
                <h3 className={`text-lg font-bold ${newTitle.length > 20 ? 'w-40' : 'w-32'} sm:w-max`}>{newTitle}</h3>
              </div>
              {plate && (
                <Badge variant="outline" className="flex w-2/4 justify-center p-2">
                  {plate}
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-6">
              <div className="flex items-center gap-2">
                <User size={24} />
                <span>{review.owner}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={24} />
                <span>{review.startTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DetailsDialog>
    </>
  )
}
