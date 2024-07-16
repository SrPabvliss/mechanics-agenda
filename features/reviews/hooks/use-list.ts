import { useSearchParams } from 'next/navigation'

import { IReviewEvent } from '@/shared/interfaces/IEvents'
import { useEffect, useState } from 'react'

import { reviewDayAdapter } from '../adapters/reviewAdapter'
import { reviewData } from '../models/IApiReview'

const useList = () => {
  const searchParams = useSearchParams()
  const [filteredItems, setFilteredItems] = useState<IReviewEvent[]>([])

  useEffect(() => {
    const date = searchParams.get('date') || ''
    const status = searchParams.get('type') as 'pending' | 'completed'

    if (date && status) {
      const itemsForDate = reviewDayAdapter(reviewData)[date] || []
      const filtered = itemsForDate.filter((item) => item.status?.toLowerCase() === status.toLowerCase())
      setFilteredItems(filtered)
    }
  }, [searchParams])

  return filteredItems
}

export default useList
