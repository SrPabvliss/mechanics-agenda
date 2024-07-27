import { IApiJob } from '@/features/jobs/models/IApiJob'
import { IApiQuote } from '@/features/quotes/models/IApiQuote'

export interface IApiReview {
  id: number
  appointmentId: number
  startDate: string
  endDate: string | null
  status: string
  jobs: IApiJob[]
  appointment: IApiQuote
}

export interface IApiCreateReview extends Omit<IApiReview, 'id' | 'endDate'> {}

export interface IApiUpdateReview extends Partial<IApiCreateReview> {}
