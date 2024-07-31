import React, { useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { convert12HourTo24Hour, convert24HourTo12Hour } from '@/lib/formatDate'

import { Label } from '../label'

interface TimePickerSelectProps {
  name: string
  label: string
}

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
const minutes = ['00', '30']
const periods = ['AM', 'PM']

const TimePickerSelect: React.FC<TimePickerSelectProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name]
    return error && typeof error.message === 'string' ? error.message : undefined
  }

  return (
    <div className="mt-2 w-fit md:mt-0">
      <Label htmlFor={name} className="ml-1">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const [hour, setHour] = React.useState<string>(convert24HourTo12Hour(field.value).hour)
          const [minute, setMinute] = React.useState<string>(convert24HourTo12Hour(field.value).min)
          const [period, setPeriod] = React.useState<string>(convert24HourTo12Hour(field.value).period)

          useEffect(() => {
            field.onChange(convert12HourTo24Hour({ hour, min: minute, period }))
          }, [field, hour, minute, period])

          return (
            <>
              <div className="mt-1 flex items-center gap-2">
                <Select
                  value={hour}
                  onValueChange={(value) => {
                    setHour(value)
                  }}
                >
                  <SelectTrigger className="max-w-fit">
                    <SelectValue placeholder="Hora" />
                  </SelectTrigger>
                  <SelectContent className="max-h-1/2 overflow-auto">
                    <SelectGroup>
                      {hours.map((h) => (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                :
                <Select
                  value={minute}
                  onValueChange={(value) => {
                    setMinute(value)
                  }}
                >
                  <SelectTrigger className="max-w-fit">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent className="max-h-24 overflow-auto">
                    <SelectGroup>
                      {minutes.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  value={period}
                  onValueChange={(value) => {
                    setPeriod(value)
                  }}
                >
                  <SelectTrigger className="max-w-fit">
                    <SelectValue placeholder="AM/PM" />
                  </SelectTrigger>
                  <SelectContent className="max-h-24 overflow-auto">
                    <SelectGroup>
                      {periods.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {getErrorMessage(name) && <p className="mt-1 max-w-52 text-sm text-red-500">{getErrorMessage(name)}</p>}
            </>
          )
        }}
      />
    </div>
  )
}

export default TimePickerSelect
