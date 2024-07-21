import { UserRole } from './IApiUser'

export interface IUser {
  ci: string
  color?: string
  firstName: string
  lastName?: string
  role: UserRole
}
