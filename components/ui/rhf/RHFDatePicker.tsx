import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

interface RHFDatePickerProps {
  name: string
  label: string
}

const RHFDatePicker: React.FC<RHFDatePickerProps> = ({ name, label }) => {
  const { control } = useFormContext()

  return (
    <div className="w-full">
      <Label htmlFor={name} className="mb-1 ml-1 ">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const [date, setDate] = React.useState<Date | undefined>(field.value ? new Date(field.value) : undefined)

          const handleDateChange = (selectedDate: Date | undefined) => {
            setDate(selectedDate)
            field.onChange(selectedDate ? selectedDate.toISOString() : '')
          }

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Selecciona una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          )
        }}
      />
    </div>
  )
}

export default RHFDatePicker
