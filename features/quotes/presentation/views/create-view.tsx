import { ContentLayout } from '@/core/layout/content/content-layout'
import React from 'react'

import QuotesForm from '../components/quotes-form'

const QuotasCreateView = () => {
  return (
    <>
      <ContentLayout title="Citas">
        <h1 className="text-2xl font-semibold">Nueva cita</h1>
        <QuotesForm />
      </ContentLayout>
    </>
  )
}

export default QuotasCreateView
