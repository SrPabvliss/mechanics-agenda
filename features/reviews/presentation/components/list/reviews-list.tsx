import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import useReviewsList from '../../../hooks/use-reviews-day-list'
import { ReviewListItem } from './review-list-item'

const List: React.FC = () => {
  const filteredItems = useReviewsList()

  return (
    <ScrollArea>
      <div className="mt-2 flex flex-col gap-4">
        {filteredItems ? (
          filteredItems?.map((item) => <ReviewListItem review={item} key={item.id} />)
        ) : (
          <p>No hay revisiones</p>
        )}
      </div>
    </ScrollArea>
  )
}

export default List
