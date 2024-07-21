'use server'

import { cookies } from 'next/headers'

export const setCookie = (key: string, value: unknown) => {
  try {
    cookies().set(key, value as string)
  } catch (error) {
    console.error('Error setting cookie', error)
  }
}

export const getCookie = async (key: string) => {
  try {
    const cookieData = cookies().get(key)?.value

    if (!cookieData) return null

    return cookieData
  } catch (error) {
    console.error('Error getting cookie', error)
  }
}

export const deleteCookie = (key: string) => {
  cookies().delete(key)
}
