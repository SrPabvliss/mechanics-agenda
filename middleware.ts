import { NextRequest, NextResponse } from 'next/server'

import { AuthDatasourceImpl } from './features/auth/services/Datasource'
import { ISubscription } from './features/notifications/models/ISubscription'
import { NotificationDataSourceImpl } from './features/notifications/services/Datasource'
import { ACCESS_TOKEN_COOKIE_NAME, PUSH_NOTIFICATIONS_IDENTIFIER } from './shared/api/api-routes'
import { getObjectFromCookie } from './shared/api/cookies-util'

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

  if (!token || !isValid) {
    const subscription: ISubscription | undefined = await getObjectFromCookie(PUSH_NOTIFICATIONS_IDENTIFIER)
    if (subscription) await NotificationDataSourceImpl.getInstance().updateSubscription(subscription)
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/login', '/:slug', '/'],
}
