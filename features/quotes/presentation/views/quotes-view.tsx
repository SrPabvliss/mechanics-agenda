import { usePathname, useRouter } from 'next/navigation'

import { ContentLayout } from '@/core/layout/content/content-layout'
import { ViewButtons } from '@/shared/components/views-buttons'
import React from 'react'

import { Button } from '@/components/ui/button'

import useQuotesView from '../../hooks/use-quotes-view'
import QuotesDay from '../components/quotes-day'
import QuotesMonth from '../components/quotes-month'
import QuotesWeek from '../components/quotes-week'

export const QuotesView = () => {
  const router = useRouter()
  const pathname = usePathname()
  const newPath = `${pathname}/new`

  const { view, date } = useQuotesView()

  return (
    <ContentLayout title="Citas">
      <div className="mb-2 lg:flex lg:justify-between ">
        <ViewButtons view={view} />
        <Button className="hidden w-fit lg:block" onClick={() => router.push(newPath)}>
          Crear
        </Button>
      </div>
      {view === 'day' && <QuotesDay date={date} />}
      {view === 'week' && <QuotesWeek />}
      {view === 'month' && <QuotesMonth />}
    </ContentLayout>
  )
}
