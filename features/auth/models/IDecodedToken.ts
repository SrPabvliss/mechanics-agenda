import { UserRole } from '@/features/users/models/IApiUser'

export interface IDecodedToken {
  sub: string
  firstName: string
  lastName: string
  role: UserRole
  iat: number
  exp: number
}
