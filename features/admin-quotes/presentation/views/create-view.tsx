import { ContentLayout } from '@/core/layout/content/content-layout'
import React from 'react'

import AdminQuotesForm from '../components/admin-quotes-form'

export const AdminQuotesCreateView = () => {
  return (
    <>
      <ContentLayout title="Citas administrativas">
        <h1 className="text-2xl font-semibold">Nueva cita administrativa</h1>
        <AdminQuotesForm />
      </ContentLayout>
    </>
  )
}

export default AdminQuotesCreateView
