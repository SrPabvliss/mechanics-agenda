import { DetailsDialog } from '@/shared/components/details-dialog'
import { Clock, User } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import useList from '../../hooks/use-list'

const List: React.FC = () => {
  const filteredItems = useList()

  const getPlateAndTitle = (title: string) => {
    const parts = title.split(' - ')
    if (parts.length >= 3) {
      const plate = parts.slice(-1).join(' - ')
      const newTitle = parts.slice(0, -1).join(' - ')
      return { plate, newTitle }
    }
    return { plate: null, newTitle: title }
  }

  return (
    <ScrollArea>
      <div className="mt-2 flex flex-col gap-4">
        {filteredItems ? (
          filteredItems?.map((item) => {
            const { plate, newTitle } = getPlateAndTitle(item.title)
            return (
              <DetailsDialog key={item.id} item={item}>
                <Card className="relative">
                  <CardContent className="mt-4 flex flex-col items-start gap-2">
                    <div
                      className={`absolute bottom-4 right-4 top-4 w-14 rounded-md border-2`}
                      style={{ backgroundColor: item.color }}
                    />
                    <div className={`flex items-center gap-2 md:flex-row md:gap-6`}>
                      <div className="flex flex-col gap-2">
                        <h3 className={`text-lg font-bold ${newTitle.length > 20 ? 'w-40' : 'w-32'} sm:w-max`}>
                          {newTitle}
                        </h3>
                      </div>
                      {plate ? (
                        <Badge variant="outline" className="flex w-2/4 justify-center p-2">
                          {plate}
                        </Badge>
                      ) : null}
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
              </DetailsDialog>
            )
          })
        ) : (
          <p>No hay revisiones</p>
        )}
      </div>
    </ScrollArea>
  )
}

export default List
