import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import useReviewsList from '../../../hooks/use-reviews-day-list'
import { NoContent } from '../no-content'
import { ReviewListItem } from './review-list-item'
import { ReviewListSkeleton } from './review-list-skeleton'

const List: React.FC = () => {
  const { data: filteredItems, isLoading } = useReviewsList()

  if (isLoading) {
    return <ReviewListSkeleton />
  }

  if (!filteredItems || filteredItems.length === 0) {
    return <NoContent />
  }

  return (
    <ScrollArea>
      <div className="mt-2 flex flex-col gap-4">
        {filteredItems?.map((item) => <ReviewListItem review={item} key={item.id} />)}
      </div>
    </ScrollArea>
  )
}

export default List
