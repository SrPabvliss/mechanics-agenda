import { IUser } from '@/features/users/models/IUser'

export interface IApiAdminQuote {
  id: number
  title: string
  description: string
  color: string
  createdAt: string
  deletedAt: string | null
  reminderDate: string
  notificationMinutesBefore: number
  notificationSent: boolean
  minutesBeforeNotificationSent: boolean
  userCI: string
  user: IUser
}

export interface IApiCreateAdminQuote
  extends Pick<
    IApiAdminQuote,
    'title' | 'description' | 'color' | 'reminderDate' | 'notificationMinutesBefore' | 'userCI'
  > {}

export interface IApiUpdateAdminQuote extends Partial<IApiCreateAdminQuote> {}

export const apiAdminQuotes: IApiAdminQuote[] = []
