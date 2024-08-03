import { IAdminQuoteFilter, IQuoteFilter, IReviewFilter } from '../interfaces/IFilters'

export const ACCESS_TOKEN_COOKIE_NAME = 'access_token'
export const ROLE_COOKIE_NAME = 'role'
export const PUSH_NOTIFICATIONS_IDENTIFIER = 'push_identifier'

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SIGN_UP: '/auth/signup',
    VALIDATE_TOKEN: '/auth/validate-token',
  },
  USERS: {
    GET_ALL: '/users',
    GET_BY_CI: (ci: string) => `/users/${ci}`,
  },
  REMINDERS: {
    GET_ALL: '/reminders',
    GET_BY_ID: (id: number) => `/reminders/${id}`,
    CREATE: '/reminders',
    UPDATE: (id: number) => `/reminders/${id}`,
    DELETE: (id: number) => `/reminders/${id}`,
    GET_BY_FILTER: (paramsFilter: IAdminQuoteFilter) => `/reminders?${buildUrlFilter(paramsFilter)}`,
  },
  APPOINTMENTS: {
    GET_ALL: '/appointments',
    GET_BY_ID: (id: number) => `/appointments/${id}`,
    CREATE: '/appointments',
    UPDATE: (id: number) => `/appointments/${id}`,
    DELETE: (id: number) => `/appointments/${id}`,
    GET_BY_FILTER: (paramsFilter: IQuoteFilter) => `/appointments?${buildUrlFilter(paramsFilter)}`,
  },
  INSPECTIONS: {
    GET_ALL: '/inspections',
    GET_BY_ID: (id: number) => `/inspections/${id}`,
    CREATE: '/inspections',
    UPDATE: (id: number) => `/inspections/${id}`,
    DELETE: (id: number) => `/inspections/${id}`,
    GET_BY_FILTER: (paramsFilter: IReviewFilter) => `/inspections?${buildUrlFilter(paramsFilter)}`,
  },
  JOBS: {
    GET_ALL: '/jobs',
    GET_BY_ID: (id: number) => `/jobs/${id}`,
    CREATE: '/jobs',
    UPDATE: (id: number) => `/jobs/${id}`,
    DELETE: (id: number) => `/jobs/${id}`,
  },
  NOTIFICATIONS: {
    SUBSCRIBE: '/subscriptions',
    UPDATE_SUBSCRIPTION: (id: number) => `/subscriptions/${id}`,
  },
}

const buildUrlFilter = (paramsFilter: IQuoteFilter | IAdminQuoteFilter | IReviewFilter) => {
  const paramsRecord = Object.entries(paramsFilter).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, string>,
  )
  const params = new URLSearchParams(paramsRecord)
  return params.toString()
}
