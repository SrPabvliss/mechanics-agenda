import queryClient from '@/core/infrastructure/react-query/query-client'
import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'

import { QuotesDatasourceImpl } from '../services/datasource'

export const useQuotesByIdQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.QUOTES, Number(id)],
    queryFn: async () => QuotesDatasourceImpl.getInstance().getById(Number(id)),
    enabled: !!id,
  })

  return query
}

export const useDeleteQuote = async (id: number) => {
  const data = await QuotesDatasourceImpl.getInstance().delete(id)
  if (!data) return
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QUOTES] })
}
