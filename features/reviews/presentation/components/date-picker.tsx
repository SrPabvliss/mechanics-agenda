'use client'

import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format, parseISO } from 'date-fns'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

export function DatePicker({ value }: { value?: string }) {
  const [date, setDate] = React.useState<Date | undefined>(value ? parseISO(value) : undefined)
  const updateQueryParam = useUpdateQueryParam()

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-3/4 justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'dd-MM-yyyy') : <span>Selecciona una fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(value) => {
              setDate(value)
              value && updateQueryParam([{ param: 'date', value: format(value, 'yyyy-MM-dd') }])
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        onClick={() => {
          setDate(new Date())
          updateQueryParam([{ param: 'date', value: format(new Date(), 'yyyy-MM-dd') }])
        }}
        className="w-1/4"
      >
        Hoy
      </Button>
    </div>
  )
}
