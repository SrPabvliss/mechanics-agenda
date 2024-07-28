import { IJob } from '@/features/jobs/models/IJob'
import { IApiQuote } from '@/features/quotes/models/IApiQuote'

export interface IApiReview {
  id: number
  appointmentId: number
  startDate: string
  endDate: string | null
  status: string
  jobs: IJob[]
  appointment: IApiQuote
}

export interface IApiCreateReview extends Omit<IApiReview, 'id' | 'endDate'> {}

export interface IApiUpdateReview extends Partial<IApiCreateReview> {}
