import { NextRequest, NextResponse } from 'next/server'

import { jwtDecode } from 'jwt-decode'

import { IDecodedToken } from './features/auth/models/IDecodedToken'
import { isRoleAllowed } from './lib/menu-list'
import { ACCESS_TOKEN_COOKIE_NAME } from './shared/api/api-routes'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value?.replaceAll('"', '')

  if (pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/quotes', req.url))
    }
    return NextResponse.next()
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const { role }: IDecodedToken = jwtDecode(token)
    const isAllowed = isRoleAllowed(pathname, role)
    if (!isAllowed) {
      return NextResponse.redirect(new URL('/403', req.url))
    }
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', req.url))
    response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/quotes',
    '/quotes/edit/:id*',
    '/quotes/create',
    '/admin-quotes',
    '/admin-quotes/edit/:id*',
    '/admin-quotes/create',
    '/reviews',
    '/reviews/edit/:id*',
    '/reviews/create',
    '/',
    '/login',
  ],
}
