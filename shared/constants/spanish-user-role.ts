import { UserRoleType } from '@/features/users/models/IApiUser'

type SpanishUserRole = {
  [key in UserRoleType]: string
}

export const spanishUserRole: SpanishUserRole = {
  ADMIN: 'Administrador',
  MECHANIC: 'Mecánico',
  SECRETARY: 'Secretaria',
}
