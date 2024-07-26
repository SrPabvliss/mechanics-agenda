import { IUser } from '../../users/models/IUser'

export interface IApiQuote {
  id: number
  clientName: string
  vehicleDescription: string
  description?: string
  date: string
  status: string
  userCI: string
  deletedAt: null
  user: IUser
}

export interface IApiCreateQuote extends Omit<IApiQuote, 'id' | 'deletedAt' | 'user'> {}

export interface IApiUpdateQuote extends Partial<IApiCreateQuote> {}

export const apiQuote: IApiQuote[] = []
