import { NextRequest, NextResponse } from 'next/server'

import { UserDatasourceImpl } from './features/auth/services/Datasource'
import { ACCESS_TOKEN_COOKIE_NAME } from './shared/api/api-routes'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value?.replaceAll('"', '')

  const isValid = token ? await UserDatasourceImpl.getInstance().validateToken() : false

  if (pathname === '/login') {
    if (token && isValid) {
      return NextResponse.redirect(new URL('/quotes', req.url))
    }
    return NextResponse.next()
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (!token || !isValid) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/login', '/:slug', '/'],
}
