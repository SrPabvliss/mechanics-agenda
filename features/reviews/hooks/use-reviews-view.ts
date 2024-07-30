import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { VIEW_TYPES } from '@/shared/constants/view-types'
import { format } from 'date-fns'
import { useEffect } from 'react'

import { REVIEW_STATUS } from '../models/IApiReview'

export const useReviewsView = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const date = searchParams.get('date') || format(new Date(), 'yyyy-MM-dd')
  const view = searchParams.get('view') || VIEW_TYPES.DAY
  const type = searchParams.get('type') || REVIEW_STATUS.PENDING

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    if (!searchParams.get('date')) {
      params.set('date', date)
    }

    if (!searchParams.get('view')) {
      params.set('view', view)
    }

    if (!searchParams.get('type')) {
      params.set('type', type)
    }

    if (!searchParams.get('date') || !searchParams.get('view') || !searchParams.get('type')) {
      router.replace(`${pathname}?${params.toString()}`)
    }
  }, [searchParams, router, pathname, date, view, type])

  return { date, view, type }
}
