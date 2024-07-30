import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'

import { JobDatasourceImpl } from '../services/datasource'

export const useJobsQuery = (inspectionId: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.JOBS, inspectionId],
    queryFn: async () => await JobDatasourceImpl.getInstance().getByInspectionId(inspectionId),
    enabled: !!inspectionId,
  })

  return query
}
