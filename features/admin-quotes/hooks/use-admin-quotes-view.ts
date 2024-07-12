import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { format } from 'date-fns'
import { useEffect } from 'react'

const useAdminQuotesView = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const date = searchParams.get('date') || format(new Date(), 'yyyy-MM-dd')
  const view = searchParams.get('view') || 'day'

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    if (!searchParams.get('view')) {
      params.set('view', view)
    }

    if (!searchParams.get('date')) {
      params.set('date', date)
    }

    if (!searchParams.get('date') || !searchParams.get('view')) {
      router.replace(`${pathname}?${params.toString()}`)
    }
  }, [searchParams, router, pathname, date, view])

  return { date, view }
}

export default useAdminQuotesView
