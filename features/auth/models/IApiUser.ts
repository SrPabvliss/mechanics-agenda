export interface IAPIUser {
  ci: string
  color?: string
  firstName: string
  lastName?: string
  role: UserRole
  deletedAt?: null
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MECHANIC = 'MECHANIC',
  SECRETARY = 'SECRETARY',
}

export interface IDecodedToken {
  sub: string
  firstName: UserRole
  iat: number
  exp: number
}
