import { REVIEW_STATUS } from '@/features/reviews/models/IApiReview'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import List from './reviews-list'

export const ReviewsTab = ({ type }: { type: string }) => {
  const updateQueryParam = useUpdateQueryParam()

  return (
    <Tabs defaultValue={type} onValueChange={(value) => updateQueryParam([{ param: 'type', value: value }])}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={REVIEW_STATUS.PENDING}>Pendientes</TabsTrigger>
        <TabsTrigger value={REVIEW_STATUS.COMPLETED}>Completadas</TabsTrigger>
      </TabsList>
      <TabsContent value={REVIEW_STATUS.PENDING}>
        <List />
      </TabsContent>
      <TabsContent value={REVIEW_STATUS.COMPLETED}>
        <List />
      </TabsContent>
    </Tabs>
  )
}
