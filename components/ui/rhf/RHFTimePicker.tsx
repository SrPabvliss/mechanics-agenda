import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { TimePicker12Demo } from '../time-picker-12h'

interface RHFTimePickerProps {
  name: string
  label: string
}

const RHFTimePicker: React.FC<RHFTimePickerProps> = ({ name, label }) => {
  const { control } = useFormContext()

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <TimePicker12Demo date={field.value} setDate={field.onChange} />}
      />
    </div>
  )
}

export default RHFTimePicker
