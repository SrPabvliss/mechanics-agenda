import { useParams } from 'next/navigation'

import { useJobsQuery } from './use-jobs-query'

const useJobsView = () => {
  const { id } = useParams()

  const { data } = useJobsQuery(id.toString())

  if (!data) {
    return {
      jobs: null,
    }
  }

  return {
    jobs: data,
  }
}

export default useJobsView
