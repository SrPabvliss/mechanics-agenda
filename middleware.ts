import { NextRequest, NextResponse } from 'next/server'

import { jwtDecode } from 'jwt-decode'

import { IDecodedToken } from './features/auth/models/IDecodedToken'
import { AuthDatasourceImpl } from './features/auth/services/Datasource'
import { isRoleAllowed } from './lib/menu-list'
import { ACCESS_TOKEN_COOKIE_NAME } from './shared/api/api-routes'
import { deleteCookie } from './shared/api/cookies-util'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value?.replaceAll('"', '')

  const isValid = token ? await AuthDatasourceImpl.getInstance().validateToken() : false

  if (pathname === '/login') {
    if (token && isValid) {
      return NextResponse.redirect(new URL('/quotes', req.url))
    }
    return NextResponse.next()
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (!isValid) {
    const response = NextResponse.next()
    deleteCookie(ACCESS_TOKEN_COOKIE_NAME, response)
    return response
  }

  if (!token || !isValid) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const { role }: IDecodedToken = jwtDecode(token)

  const isAllowed = isRoleAllowed(pathname, role)

  console.log(req.url)

  if (!isAllowed && pathname !== '/403') {
    return NextResponse.redirect(new URL('/403', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/login', '/:slug', '/'],
}
