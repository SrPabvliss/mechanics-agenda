import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export const ReviewListSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 ">
      {[1, 2, 3].map((_, index) => (
        <div className="flex items-center justify-between rounded-lg border p-4 shadow" key={index}>
          <div className="flex w-full flex-col space-y-2">
            <Skeleton className="h-10 w-11/12 rounded" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-2/6 rounded" />
              <Skeleton className="h-8 w-2/6 rounded" />
            </div>
          </div>
          <Skeleton className="h-20 w-16 rounded-md" />
        </div>
      ))}
    </div>
  )
}
