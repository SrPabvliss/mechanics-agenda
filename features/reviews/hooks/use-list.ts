import { useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'

import { IReview, items } from '../models/IReview'

const useList = () => {
  const searchParams = useSearchParams()
  const [filteredItems, setFilteredItems] = useState<IReview[]>([])

  useEffect(() => {
    const date = searchParams.get('date') || ''
    const status = searchParams.get('type') as 'pending' | 'completed'

    if (date && status) {
      const itemsForDate = items[date] || []
      const filtered = itemsForDate.filter((item) => item.status === status)
      setFilteredItems(filtered)
    }
  }, [searchParams])

  return filteredItems
}

export default useList
