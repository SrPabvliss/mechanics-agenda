import { REVIEW_STATUS } from '@/features/reviews/models/IApiReview'
import JobsNoContent from '@/public/jobs-no-content.webp'
import NoContent from '@/shared/components/no-content'

import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ScrollArea } from '@/components/ui/scroll-area'

import useJobsView from '../../hooks/use-jobs-view'
import { CreateJobForm } from '../components/create-job-form'
import { JobListItem } from '../components/job-list-item'
import { JobSkeleton } from '../components/job-skeleton'
import { ReviewActions } from '../components/review-actions'

interface Props {
  reviewStatus: REVIEW_STATUS
}

export const JobsListView = ({ reviewStatus }: Props) => {
  const { jobs, isLoading, isFetching } = useJobsView()

  const header = (
    <div>
      <div className="flex items-center gap-8">
        <h2 className="font-semibold">Trabajos</h2>
      </div>

      <div className="mb-0 mt-1 flex items-center gap-1">
        {isFetching ? (
          <>
            <LoadingSpinner />
            <span className="text-xs font-thin">Actualizando los trabajos ...</span>
          </>
        ) : (
          <div className="h-6">
            <p className="font-sm mt-1 text-xs">Gestiona los trabajos que se realizarán en la revisión.</p>
          </div>
        )}
      </div>
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
      {reviewStatus === REVIEW_STATUS.PENDING && <CreateJobForm isFetching={isFetching || false} />}

      {jobs.length > 0 ? (
        <ScrollArea className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} status={reviewStatus} isFetching={isFetching || false} />
          ))}
        </ScrollArea>
      ) : (
        <NoContent
          src={JobsNoContent.src}
          title="No hay trabajos disponibles"
          subtitle="Aquí se mostrarán los trabajos que se han agendado."
        />
      )}

      <ReviewActions status={reviewStatus} isFetching={isFetching || false} />
    </div>
  )
}
