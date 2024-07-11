import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { Label } from '@/components/ui/label'

import { AutosizeTextarea } from '../autosize-textarea'

interface RHFTextAreaProps {
  name: string
  label: string
  maxHeight?: number
  minHeight?: number
  placeholder?: string
}

const RHFTextArea: React.FC<RHFTextAreaProps> = ({ name, label, maxHeight, minHeight, placeholder }) => {
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
          <AutosizeTextarea
            {...field}
            maxHeight={maxHeight}
            minHeight={minHeight}
            placeholder={placeholder}
            className={`mt-1 ${getErrorMessage(name) ? 'border-red-500' : ''}`}
          />
        )}
      />
      {getErrorMessage(name) && <p className="mt-1 text-sm text-red-500">{getErrorMessage(name)}</p>}
    </div>
  )
}

export default RHFTextArea
