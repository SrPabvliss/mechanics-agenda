import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'

import { QuotesDatasourceImpl } from '../services/datasource'

const useQuotesByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.QUOTES, Number(id)],
    queryFn: async () => QuotesDatasourceImpl.getInstance().getById(Number(id)),
    enabled: !!id,
  })
}

export default useQuotesByIdQuery
