import { UserRole } from '@/features/users/models/IApiUser'

export interface IDecodedToken {
  sub: string
  firstName: UserRole
  iat: number
  exp: number
}
