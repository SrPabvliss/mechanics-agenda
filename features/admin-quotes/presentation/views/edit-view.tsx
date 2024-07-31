import { useRouter } from 'next/navigation'

import { ContentLayout } from '@/core/layout/content/content-layout'
import Spinner from '@/shared/components/spinner'
import React from 'react'

import { useAdminQuoteByIdQuery } from '../../hooks/use-admin-quotes-query'
import AdminQuotesForm from '../components/admin-quotes-form'

export const AdminQuotesEditView = ({ id }: { id: string }) => {
  const { data: adminQuote, isFetching } = useAdminQuoteByIdQuery(id)
  const router = useRouter()

  if (!isFetching && !adminQuote) {
    router.push('/quotes')
  }

  if (isFetching || !adminQuote)
    return (
      <ContentLayout title="Citas administrativas">
        <div className="h-[calc(100vh_-_150px)]">
          <Spinner description={`Cargando cita con el id ${id} ...`}></Spinner>
        </div>
      </ContentLayout>
    )
  return (
    <>
      <ContentLayout title="Citas administrativas">
        <h1 className="text-2xl font-semibold">Editar cita administrativa</h1>
        <AdminQuotesForm currentAdminQuote={adminQuote} />
      </ContentLayout>
    </>
  )
}

export default AdminQuotesEditView
