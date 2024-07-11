import React from 'react'

import { Button } from '@/components/ui/button'

import { useUpdateQueryParam } from '../../../../shared/hooks/update-query-param'

export const ViewButtons = ({ view }: { view: string }) => {
  const updateQueryParams = useUpdateQueryParam()

  return (
    <div className="flex gap-4 md:w-1/2">
      <Button variant={view === 'day' ? 'default' : 'outline'} onClick={() => updateQueryParams('view', 'day')}>
        Día
      </Button>
      <Button variant={view === 'week' ? 'default' : 'outline'} onClick={() => updateQueryParams('view', 'week')}>
        Semana
      </Button>
      <Button variant={view === 'month' ? 'default' : 'outline'} onClick={() => updateQueryParams('view', 'month')}>
        Mes
      </Button>
    </div>
  )
}
