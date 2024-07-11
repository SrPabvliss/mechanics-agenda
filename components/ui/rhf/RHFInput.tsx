import { useFormContext, Controller } from 'react-hook-form'

import { Input } from '../input'
import { Label } from '../label'

interface FormInputProps {
  name: string
  label: string
  type?: string
  placeholder?: string
}

const RHFInput: React.FC<FormInputProps> = ({ name, label, type = 'text', placeholder }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name]
    return error && typeof error.message === 'string' ? error.message : undefined
  }

  return (
    <div className="mt-1 w-full">
      <Label htmlFor={name} className="ml-1 ">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input {...field} id={name} type={type} placeholder={placeholder} className="mt-1" />}
      />
      {getErrorMessage(name) && <p className="mt-1 max-w-52 text-sm text-red-500">{getErrorMessage(name)}</p>}
    </div>
  )
}

export default RHFInput
