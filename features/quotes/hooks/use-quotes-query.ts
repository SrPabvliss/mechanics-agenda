import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'

import { QuotesDatasourceImpl } from '../services/datasource'

interface IQuotesQuery {
  startDate: string
  endDate: string
}

const useQuotesQuery = ({ startDate, endDate }: IQuotesQuery) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.QUOTES, startDate, endDate],
    queryFn: async () =>
      QuotesDatasourceImpl.getInstance().getByFilter({
        startDate: startDate,
        endDate: endDate,
      }),
    enabled: !!startDate && !!endDate,
  })

  return query
}

export default useQuotesQuery
