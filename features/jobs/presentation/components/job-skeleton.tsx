import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export const JobSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-md" />
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  )
}
