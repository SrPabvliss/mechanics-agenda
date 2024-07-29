import { REVIEW_STATUS } from '@/features/reviews/models/IApiReview'

import { ScrollArea } from '@/components/ui/scroll-area'

import useJobsView from '../../hooks/use-jobs-view'
import { CreateJobForm } from '../components/create-job-form'
import { JobListItem } from '../components/job-list-item'
import { ReviewActions } from '../components/review-actions'

interface Props {
  reviewStatus: REVIEW_STATUS
}

export const JobsListView = ({ reviewStatus }: Props) => {
  const { jobs } = useJobsView()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold">Actividades</h2>
        <p className="font-sm mt-1 text-xs">Gestiona las actividades que se realizarán en la revisión.</p>
      </div>
      {reviewStatus === REVIEW_STATUS.PENDING && <CreateJobForm />}

      {jobs && jobs.length > 0 ? (
        <ScrollArea className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} status={reviewStatus} />
          ))}
        </ScrollArea>
      ) : (
        <p>No hay actividades registradas</p>
      )}

      <ReviewActions status={reviewStatus} />
    </div>
  )
}
