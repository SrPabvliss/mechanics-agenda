import { Clock, User } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import useList from '../../hooks/use-list'
import { ReviewDetailsDialog } from './review-details-dialog'

const List: React.FC = () => {
  const filteredItems = useList()

  return (
    <ScrollArea>
      <div className="mt-2 flex flex-col gap-4">
        {filteredItems.map((item) => (
          <ReviewDetailsDialog key={item.id} item={item}>
            <Card className="relative cursor-pointer">
              <CardContent className="mt-4 flex flex-col gap-2">
                <div className={`absolute bottom-4 right-4 top-4 w-14 rounded-md border-2 ${item.color}`} />
                <div
                  className={`flex ${item.title.length > 15 ? 'flex-col justify-center' : 'flex-row '} items-center gap-2 md:flex-row md:gap-6`}
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                  <Badge variant="outline" className="flex w-1/4 justify-center p-2">
                    {item.label}
                  </Badge>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                  <div className="flex items-center gap-2">
                    <User size={24} />
                    <span>{item.owner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={24} />
                    <span>{item.startTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ReviewDetailsDialog>
        ))}
      </div>
    </ScrollArea>
  )
}

export default List
