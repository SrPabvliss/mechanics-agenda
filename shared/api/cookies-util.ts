'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const setCookie = (key: string, value: unknown) => {
  cookies().set(key, value as string)
}

export const getCookie = async (key: string) => {
  const cookieData = cookies().get(key)?.value

  if (!cookieData) return null

  return cookieData
}

export const setObjectInCookie = (key: string, obj: unknown) => {
  const jsonString = JSON.stringify(obj)
  setCookie(key, jsonString)
}

export const getObjectFromCookie = async (key: string) => {
  const jsonString = await getCookie(key)
  if (!jsonString) return null
  return JSON.parse(jsonString)
}

export const deleteCookie = (key: string, res?: NextResponse) => {
  if (res) {
    res.cookies.set(key, '', { maxAge: -1 })
    return res
  }
  cookies().delete(key)
}
