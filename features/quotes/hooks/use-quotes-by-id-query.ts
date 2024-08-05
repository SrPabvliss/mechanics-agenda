import queryClient from '@/core/infrastructure/react-query/query-client'
import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { QuotesDatasourceImpl } from '../services/datasource'

const useQuotesByIdQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.QUOTES, Number(id)],
    queryFn: async () => QuotesDatasourceImpl.getInstance().getById(Number(id)),
    enabled: !!id,
  })

  useEffect(() => {
    const unsubscribe = async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.QUOTES, Number(id)] })
    }
    return () => {
      unsubscribe()
    }
  }, [id])

  return query
}

export default useQuotesByIdQuery
