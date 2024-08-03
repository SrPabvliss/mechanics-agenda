import { useParams } from 'next/navigation'

import { JOB_STATUS } from '../models/IJob'
import { useJobsQuery } from './use-jobs-query'

const useJobsView = () => {
  const { id } = useParams()

  const { data, isFetching, isLoading } = useJobsQuery(+id)

  if (!data) {
    return {
      jobs: null,
      isFetching,
      isLoading,
    }
  }

  const sortedJobs = [...data].sort((a, b) => {
    if (a.status === JOB_STATUS.PENDING && b.status === JOB_STATUS.COMPLETED) return -1
    if (a.status === JOB_STATUS.COMPLETED && JOB_STATUS.PENDING) return 1
    return 0
  })

  return {
    jobs: sortedJobs,
    isFetching,
    isLoading,
  }
}

export default useJobsView
