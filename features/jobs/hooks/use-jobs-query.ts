import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'

import { JobDatasourceImpl } from '../services/datasource'

export const useJobsQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.REVIEWS, id, QUERY_KEY.JOBS],
    queryFn: async () => await JobDatasourceImpl.getInstance().getByInspectionId(+id),
    enabled: !!id,
  })

  return query
}
