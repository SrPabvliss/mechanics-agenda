import { useRouter } from 'next/navigation'

import { ContentLayout } from '@/core/layout/content/content-layout'
import Spinner from '@/shared/components/spinner'
import React from 'react'

import { useQuotesByIdQuery } from '../../hooks/use-quotes-query'
import NewEditQuotesForm from '../components/new-edit-quotes-form'

export const QuotesEditView = ({ id }: { id: string }) => {
  const { data: quote, isFetching } = useQuotesByIdQuery(id)
  const router = useRouter()

  if (!isFetching && !quote) {
    router.push('/quotes')
  }

  if (isFetching)
    return (
      <ContentLayout title="Citas">
        <div className="h-[calc(100vh_-_150px)]">
          <Spinner description={`Cargando cita con el id ${id} ...`}></Spinner>
        </div>
      </ContentLayout>
    )

  return (
    <ContentLayout title="Citas">
      <h1 className="text-2xl font-semibold">Editar cita</h1>
      <NewEditQuotesForm currentQuote={quote} />
    </ContentLayout>
  )
}

export default QuotesEditView
