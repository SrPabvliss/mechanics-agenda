import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'

import { UserDatasourcesImpl } from '../services/datasource'

const useUsersQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.USERS],
    queryFn: () => UserDatasourcesImpl.getInstance().getAll(),
  })
  return query
}

export default useUsersQuery
