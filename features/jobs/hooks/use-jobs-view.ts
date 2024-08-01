import { useParams } from 'next/navigation'

import { useJobsQuery } from './use-jobs-query'

const useJobsView = () => {
  const { id } = useParams()

  const { data, isFetching, isLoading } = useJobsQuery(+id)

  if (!data) {
    return {
      jobs: null,
    }
  }

  return {
    jobs: data,
    isFetching,
    isLoading,
  }
}

export default useJobsView
