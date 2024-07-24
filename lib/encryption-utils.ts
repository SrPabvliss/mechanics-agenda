import { genSalt, hash } from 'bcryptjs'

export const encrypt = async (endpoint: string): Promise<string> => {
  const ROUNDS = 10
  const salt = await genSalt(ROUNDS)
  const hashedEndpoint = await hash(endpoint, salt)
  return hashedEndpoint
}

export const generateSalt = async (endpoint: string): Promise<string> => {
  const ROUNDS = 10
  const salt = await genSalt(ROUNDS)
  return hash(endpoint, salt)
}
