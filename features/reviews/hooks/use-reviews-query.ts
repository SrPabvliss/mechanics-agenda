import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'

import { ReviewDatasourceImpl } from '../services/datasource'

interface IQuotesQuery {
  date1: string
  date2: string
  status?: string
  type?: string
}

const useReviewsQuery = ({ date1, date2, status, type }: IQuotesQuery) => {
  const getQueryKey = () => {
    if (type === 'day') {
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
        status: type === 'day' ? status : undefined,
      }),
    enabled: !!date1 && !!date2,
  })

  return query
}

export default useReviewsQuery
