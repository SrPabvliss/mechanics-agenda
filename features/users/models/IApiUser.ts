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

export type UserRoleType = keyof typeof UserRole
