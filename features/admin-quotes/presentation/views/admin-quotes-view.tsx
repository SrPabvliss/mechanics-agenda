import { usePathname, useRouter } from 'next/navigation'

import { ContentLayout } from '@/core/layout/content/content-layout'
import useQuotesView from '@/features/quotes/hooks/use-quotes-view'
import { ViewButtons } from '@/shared/components/views-buttons'
import React from 'react'

import { Button } from '@/components/ui/button'

import { useAdminQListener } from '../../services/quote-sockets'
import AdminQuotesDay from '../components/admin-quotes-day'
import AdminQuotesMonth from '../components/admin-quotes-month'
import AdminQuotesWeek from '../components/admin-quotes-week'

export const AdminQuotesView = () => {
  useAdminQListener()
  const router = useRouter()
  const pathname = usePathname()
  const newPath = `${pathname}/new`

  const { view, date } = useQuotesView()
  return (
    <>
      <ContentLayout title="Citas administrativas">
        <div className="mb-2 lg:flex lg:justify-between ">
          <ViewButtons view={view} />
          <Button className="hidden w-fit lg:block" onClick={() => router.push(newPath)}>
            Crear
          </Button>
        </div>
        {view === 'day' && <AdminQuotesDay date={date} />}
        {view === 'week' && <AdminQuotesWeek />}
        {view === 'month' && <AdminQuotesMonth />}
      </ContentLayout>
    </>
  )
}
