import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
    <div className="mt-2 w-full md:mt-0">
      <Label htmlFor={name} className="ml-1">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const [hour, setHour] = React.useState<string>('10')
          const [minute, setMinute] = React.useState<string>('00')
          const [period, setPeriod] = React.useState<string>('AM')

          const handleChange = () => {
            field.onChange(`${hour}:${minute} ${period}`)
          }

          return (
            <>
              <div className="mt-1 flex items-center gap-2">
                <Select
                  value={hour}
                  onValueChange={(value) => {
                    setHour(value)
                    handleChange()
                  }}
                >
                  <SelectTrigger className="w-16">
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
                    handleChange()
                  }}
                >
                  <SelectTrigger className="w-16">
                    <SelectValue placeholder="Minuto" />
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
                    handleChange()
                  }}
                >
                  <SelectTrigger className="w-20">
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
