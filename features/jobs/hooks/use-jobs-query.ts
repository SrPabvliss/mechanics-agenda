import queryClient from '@/core/infrastructure/react-query/query-client'
import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { JobDatasourceImpl } from '../services/datasource'

export const useJobsQuery = (inspectionId: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.JOBS, inspectionId],
    queryFn: async () => await JobDatasourceImpl.getInstance().getByInspectionId(inspectionId),
    enabled: !!inspectionId,
  })

  useEffect(() => {
    return () => {
      const unsubscribe = async () => {
        await queryClient.cancelQueries({ queryKey: [QUERY_KEY.JOBS, inspectionId] })
      }
      unsubscribe()
    }
  }, [inspectionId])

  return query
}
