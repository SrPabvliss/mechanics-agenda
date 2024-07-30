import { ContentLayout } from '@/core/layout/content/content-layout'
import React from 'react'

import NewEditQuotesForm from '../components/new-edit-quotes-form'

const QuotasCreateView = () => {
  return (
    <>
      <ContentLayout title="Citas">
        <h1 className="text-2xl font-semibold">Nueva cita</h1>
        <NewEditQuotesForm />
      </ContentLayout>
    </>
  )
}

export default QuotasCreateView
