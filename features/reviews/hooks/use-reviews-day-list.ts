import { useSearchParams } from 'next/navigation'

import { VIEW_TYPES } from '@/shared/constants/view-types'
import { useEffect, useState } from 'react'

import { formatDateTime } from '@/lib/formatDate'

import { ReviewAdapter } from '../adapters/reviewAdapter'
import { REVIEW_STATUS } from '../models/IApiReview'
import { useReviewsQuery } from './use-reviews-query'

const useReviewsList = () => {
  const searchParams = useSearchParams()
  const date = searchParams.get('date') || ''
  const [dates, setDates] = useState<{ date1: string; date2: string }>({ date1: '', date2: '' })
  const status = (searchParams.get('type') as REVIEW_STATUS) || REVIEW_STATUS.PENDING
  const type = searchParams.get('view') || VIEW_TYPES.DAY

  const { data, isLoading } = useReviewsQuery({
    date1: formatDateTime(dates.date1, '00:00'),
    date2: formatDateTime(dates.date2, '23:59'),
    status: status.toUpperCase(),
    type,
  })

  useEffect(() => {
    setDates({ date1: date, date2: date })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return {
    data: data ? ReviewAdapter.dayAdapter(data) : [],
    isLoading,
  }
}

export default useReviewsList
