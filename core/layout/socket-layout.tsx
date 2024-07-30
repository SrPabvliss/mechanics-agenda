'use client'
import { useParams } from 'next/navigation'

import React from 'react'

import AdminQuotesProvider from '../providers/admin-quotes-socket-provider'
import QuotesProvider from '../providers/quotes-socket-provider'

interface Props {
  children: React.ReactNode
}

const SocketsLayout: React.FC<Props> = ({ children }) => {
  const { module } = useParams() as { module?: string }

  const modules: Record<string, () => React.ReactElement> = {
    'admin-quotes': () => <AdminQuotesProvider>{children}</AdminQuotesProvider>,
    quotes: () => <QuotesProvider>{children}</QuotesProvider>,
    reviews: () => <QuotesProvider>{children}</QuotesProvider>,
  }

  const Module = module ? modules[module] : null

  if (!Module) {
    return <>{children}</>
  }

  return Module()
}

export default SocketsLayout
