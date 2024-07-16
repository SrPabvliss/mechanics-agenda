import { IEvent, IQuoteEvent, IAdminQuoteEvent, IReviewEvent } from '@/shared/interfaces/IEvents'
import React from 'react'

import { AdminQuoteEventDetails, QuoteEventDetails, ReviewEventDetails } from '../constants/event-details'

const getEventDetailsComponent = (event: IEvent, props: any) => {
  if ('status' in event || 'owner' in event) {
    return <ReviewEventDetails event={event as IReviewEvent} {...props} />
  }

  if ('endTime' in event) {
    return <QuoteEventDetails event={event as IQuoteEvent} {...props} />
  }

  return <AdminQuoteEventDetails event={event as IAdminQuoteEvent} {...props} />
}

export default getEventDetailsComponent
