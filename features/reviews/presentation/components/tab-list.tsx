import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const TabList = ({ type }: { type: string }) => {
  const updateQueryParam = useUpdateQueryParam()

  return (
    <Tabs value={type} onValueChange={(value) => updateQueryParam('type', value)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pending">Pendientes</TabsTrigger>
        <TabsTrigger value="completed">Completadas</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">Pendientes</TabsContent>
      <TabsContent value="completed">Completadas</TabsContent>
    </Tabs>
  )
}
