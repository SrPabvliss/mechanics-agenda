export interface IAuth {
  ci: string
  password: string
}

export interface ILoginResponse {
  access_token: string
}

export interface IValidate {
  isValid: boolean
  message?: string
}
