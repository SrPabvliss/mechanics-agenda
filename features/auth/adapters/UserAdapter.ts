import { IAPIUser } from '../models/IApiUser'
import { IUser } from '../models/IUser'

export class UserAdapter {
  static toDomain(data: IAPIUser): IUser {
    return {
      ci: data.ci,
      color: data.color || undefined,
      firstName: data.firstName,
      lastName: data.lastName || undefined,
      role: data.role,
    }
  }
}
