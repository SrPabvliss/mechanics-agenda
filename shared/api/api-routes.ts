export const ACCESS_TOKEN_COOKIE_NAME = 'access_token'
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
    GET_BY_ID: (id: string) => `/reminders/${id}`,
    CREATE: '/reminders',
    UPDATE: (id: string) => `/reminders/${id}`,
    DELETE: (id: string) => `/reminders/${id}`,
  },
  APPOINTMENTS: {
    GET_ALL: '/appointments',
    GET_BY_ID: (id: string) => `/appointments/${id}`,
    CREATE: '/appointments',
    UPDATE: (id: string) => `/appointments/${id}`,
    DELETE: (id: string) => `/appointments/${id}`,
  },
  INSPECTIONS: {
    GET_ALL: '/inspections',
    GET_BY_ID: (id: string) => `/inspections/${id}`,
    CREATE: '/inspections',
    UPDATE: (id: string) => `/inspections/${id}`,
    DELETE: (id: string) => `/inspections/${id}`,
  },
  JOBS: {
    GET_ALL: '/jobs',
    GET_BY_ID: (id: string) => `/jobs/${id}`,
    CREATE: '/jobs',
    UPDATE: (id: string) => `/jobs/${id}`,
    DELETE: (id: string) => `/jobs/${id}`,
  },
  NOTIFICATIONS: {
    SUBSCRIBE: '/subscriptions',
    UPDATE_SUBSCRIPTION: (id: number) => `/subscriptions/${id}`,
  },
}
