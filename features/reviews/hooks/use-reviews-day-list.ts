import { useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'

import { formatDateTime } from '@/lib/formatDate'

import { ReviewAdapter } from '../adapters/reviewAdapter'
import { useReviewsQuery } from './use-reviews-query'

const useReviewsList = () => {
  const searchParams = useSearchParams()
  const date = searchParams.get('date') || ''
  const [dates, setDates] = useState<{ date1: string; date2: string }>({ date1: '', date2: '' })
  const status = (searchParams.get('type') as 'pending' | 'completed') || 'pending'
  const type = searchParams.get('view') || 'day'

  const { data } = useReviewsQuery({
    date1: formatDateTime(dates.date1, '00:00'),
    date2: formatDateTime(dates.date2, '23:59'),
    status: status.toUpperCase(),
    type,
  })

  useEffect(() => {
    setDates({ date1: date, date2: date })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return data ? ReviewAdapter.dayAdapter(data) : []
}

export default useReviewsList
