import { REVIEW_STATUS } from '@/features/reviews/models/IApiReview'
import Spinner from '@/shared/components/spinner'

import { ScrollArea } from '@/components/ui/scroll-area'

import useJobsView from '../../hooks/use-jobs-view'
import { CreateJobForm } from '../components/create-job-form'
import { JobListItem } from '../components/job-list-item'
import { JobSkeleton } from '../components/job-skeleton'
import { NoContent } from '../components/no-content'
import { ReviewActions } from '../components/review-actions'

interface Props {
  reviewStatus: REVIEW_STATUS
}

export const JobsListView = ({ reviewStatus }: Props) => {
  const { jobs, isLoading, isFetching } = useJobsView()

  const header = (
    <div>
      <h2 className="font-semibold">Actividades</h2>
      <p className="font-sm mt-1 text-xs">Gestiona las actividades que se realizarán en la revisión.</p>
    </div>
  )
  if (isLoading || !jobs) {
    return (
      <>
        {header}
        <JobSkeleton />
      </>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {header}
      {isFetching && <Spinner description="Actualizando las actividades ..."></Spinner>}
      {reviewStatus === REVIEW_STATUS.PENDING && !isFetching && <CreateJobForm />}

      {jobs.length > 0 ? (
        <ScrollArea className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} status={reviewStatus} isFetching={isFetching || false} />
          ))}
        </ScrollArea>
      ) : (
        <NoContent />
      )}

      {!isFetching && <ReviewActions status={reviewStatus} isFetching={isFetching || false} />}
    </div>
  )
}
