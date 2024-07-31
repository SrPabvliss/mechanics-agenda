import { useParams, useRouter } from 'next/navigation'

import { REVIEW_STATUS } from '@/features/reviews/models/IApiReview'
import { ReviewDatasourceImpl } from '@/features/reviews/services/datasource'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { JOB_STATUS } from '../models/IJob'
import { JobDatasourceImpl } from '../services/datasource'

const jobSchema = z.object({
  name: z.string().nonempty('El nombre es requerido'),
  status: z.enum([JOB_STATUS.PENDING, JOB_STATUS.COMPLETED]),
})

type JobFormValues = z.infer<typeof jobSchema>

export const useJobMethods = (currentJob?: Partial<JobFormValues>, id?: number) => {
  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: currentJob ? currentJob : { name: '', status: JOB_STATUS.PENDING },
  })

  const { id: inspectionId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true)
    const response = id
      ? await JobDatasourceImpl.getInstance().update(id, data)
      : await JobDatasourceImpl.getInstance().create({ ...data, inspectionId: +inspectionId })
    setIsSubmitting(false)
    if (!response) return
    methods.reset()
  }

  const handleToggleStatus = async (jobId: number, currentStatus: string) => {
    const updatedStatus = currentStatus === JOB_STATUS.COMPLETED ? JOB_STATUS.PENDING : JOB_STATUS.COMPLETED
    const response = await JobDatasourceImpl.getInstance().update(+jobId, { status: updatedStatus })
    if (!response) return
  }

  const handleDeleteJob = async (jobId: number) => {
    const response = await JobDatasourceImpl.getInstance().delete(+jobId)
    if (!response) return
  }

  const handleCloseReview = async () => {
    const response = await ReviewDatasourceImpl.getInstance().update(+inspectionId, { status: REVIEW_STATUS.COMPLETED })
    if (!response) return
    router.push('/reviews')
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
    handleToggleStatus,
    handleDeleteJob,
    handleCloseReview,
    isSubmitting: isSubmitting,
    isValid: methods.formState.isValid,
  }
}
