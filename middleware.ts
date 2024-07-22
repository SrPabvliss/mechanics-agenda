import { NextRequest, NextResponse } from 'next/server'

import { jwtVerify } from 'jose'

import { ACCESS_TOKEN_COOKIE_NAME } from './shared/api/api-routes'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token =
    req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value &&
    req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value.replaceAll('"', '')

  if (pathname === '/login') {
    if (token) {
      try {
        await jwtVerify(token, secret)
        return NextResponse.redirect(new URL('/quotes', req.url))
      } catch (error) {
        return NextResponse.next()
      }
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
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/login', '/:slug', '/'],
}
