import queryClient from '@/core/infrastructure/react-query/query-client'
import { QUERY_KEY } from '@/shared/api/query-key'
import { VIEW_TYPES } from '@/shared/constants/view-types'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { ReviewDatasourceImpl } from '../services/datasource'

interface IQuotesQuery {
  date1: string
  date2: string
  status?: string
  type?: string
}

export const useReviewsQuery = ({ date1, date2, status, type }: IQuotesQuery) => {
  const getQueryKey = () => {
    if (type === VIEW_TYPES.DAY) {
      return [QUERY_KEY.REVIEWS, date1, date2, status]
    }
    return [QUERY_KEY.REVIEWS, date1, date2]
  }

  const query = useQuery({
    queryKey: getQueryKey(),
    queryFn: async () =>
      await ReviewDatasourceImpl.getInstance().getByFilter({
        startDate: date1,
        endDate: date2,
        status: VIEW_TYPES.DAY ? status : undefined,
      }),
    enabled: !!date1 && !!date2,
  })

  useEffect(() => {
    return () => {
      const unsubscribe = async () => {
        await queryClient.cancelQueries({ queryKey: getQueryKey() })
      }
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date1, date2, status, type])

  return query
}

export const useIndividualReviewQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.REVIEWS, id],
    queryFn: async () => await ReviewDatasourceImpl.getInstance().getById(id),
    enabled: !!id,
  })

  useEffect(() => {
    return () => {
      const unsubscribe = async () => {
        await queryClient.cancelQueries({ queryKey: [QUERY_KEY.REVIEWS, id] })
      }
      unsubscribe()
    }
  }, [id])

  return query
}
