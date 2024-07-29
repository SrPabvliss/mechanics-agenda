import { IJob } from '@/features/jobs/models/IJob'
import { IApiQuote } from '@/features/quotes/models/IApiQuote'

export enum REVIEW_STATUS {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface IApiReview {
  id: number
  appointmentId: number
  startDate: string
  endDate: string | null
  status: REVIEW_STATUS
  jobs: IJob[]
  appointment: IApiQuote
}

export interface IApiCreateReview extends Omit<IApiReview, 'id' | 'endDate'> {}

export interface IApiUpdateReview extends Partial<IApiCreateReview> {}
