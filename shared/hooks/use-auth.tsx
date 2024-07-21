'use client'

import { usePathname, useRouter } from 'next/navigation'

import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'

import { deleteCookie, getCookie } from '../api/cookies-util'

const useAuth = () => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getCookie('access_token')
      console.log('Token:', token)

      if (!token) {
        router.push('/login')
        return
      }

      try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if (decoded.exp && decoded.exp < currentTime) {
          deleteCookie('access_token')
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
      }
    }

    checkAuth()
  }, [pathname, router])

  return null
}

export default useAuth
