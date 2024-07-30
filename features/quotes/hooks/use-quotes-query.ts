import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'

import { QuotesDatasourceImpl } from '../services/datasource'

interface IQuotesQuery {
  date1: string
  date2: string
}

const useQuotesQuery = ({ date1, date2 }: IQuotesQuery) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.QUOTES, date1, date2],
    queryFn: async () =>
      QuotesDatasourceImpl.getInstance().getByFilter({
        startDate: date1,
        endDate: date2,
      }),
    enabled: !!date1 && !!date2,
  })

  return query
}

export default useQuotesQuery
