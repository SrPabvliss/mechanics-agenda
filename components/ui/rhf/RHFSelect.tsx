import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface RHFSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const RHFSelect: React.FC<RHFSelectProps> = ({ name, label, options, placeholder }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name]
    return error && typeof error.message === 'string' ? error.message : undefined
  }

  return (
    <div className="mt-2 w-full">
      <Label htmlFor={name} className="ml-1">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="max-h-40 overflow-auto">
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {getErrorMessage(name) && <p className="mt-1 text-sm text-red-500">{getErrorMessage(name)}</p>}
          </>
        )}
      />
    </div>
  )
}

export default RHFSelect
