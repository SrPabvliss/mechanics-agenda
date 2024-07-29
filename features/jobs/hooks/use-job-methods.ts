import { useParams } from 'next/navigation'

import { ReviewDatasourceImpl } from '@/features/reviews/services/datasource'
import { QUERY_KEY } from '@/shared/api/query-key'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { JobDatasourceImpl } from '../services/datasource'

const jobSchema = z.object({
  name: z.string().nonempty('El nombre es requerido'),
  status: z.string().default('PENDING'),
})

type JobFormValues = z.infer<typeof jobSchema>

export const useJobMethods = (currentJob?: Partial<JobFormValues>, id?: string) => {
  const queryClient = useQueryClient()
  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: currentJob ? currentJob : { name: '', status: 'PENDING' },
  })

  const { id: inspectionId } = useParams()

  const handleSubmit = async (data: JobFormValues) => {
    const response = id
      ? await JobDatasourceImpl.getInstance().update(+id, data)
      : await JobDatasourceImpl.getInstance().create({ ...data, inspectionId: +inspectionId })
    if (!response) return
    methods.setValue('name', '')
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, inspectionId, QUERY_KEY.JOBS] })
  }

  const handleToggleStatus = async (jobId: string, currentStatus: string) => {
    const updatedStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED'
    const response = await JobDatasourceImpl.getInstance().update(+jobId, { status: updatedStatus })
    if (!response) return
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, inspectionId, QUERY_KEY.JOBS] })
  }

  const handleDeleteJob = async (jobId: string) => {
    const response = await JobDatasourceImpl.getInstance().delete(+jobId)
    if (!response) return
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, inspectionId, QUERY_KEY.JOBS] })
  }

  const handleCloseReview = async () => {
    const response = await ReviewDatasourceImpl.getInstance().update(+inspectionId, { status: 'COMPLETED' })
    if (!response) return
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, inspectionId] })
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
    handleToggleStatus,
    handleDeleteJob,
    handleCloseReview,
  }
}
