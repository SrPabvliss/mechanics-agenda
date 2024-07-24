import TimePickerDialog from '@/shared/components/time-selection/time-picker-dialog'
import { IUser } from '@/shared/interfaces/IUser'
import { TimerIcon } from 'lucide-react'
import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../button'
import { Label } from '../label'

interface TimePickerByMechanicProps {
  name: string
  label: string
}

const RHFTimePickerByMechanic: React.FC<TimePickerByMechanicProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const getErrorMessage = (fieldPath: string): string | undefined => {
    const keys = fieldPath.split('.')
    const error = errors[keys[0]]
    if (error) {
      return (error as any)[keys[1]]?.message
    }
  }
  return (
    <div className="w-full">
      <Label htmlFor={name} className="mb-1 ml-1 ">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const [time, setTime] = React.useState<string | undefined>()
          const [mechanic, setMechanic] = React.useState<IUser>()

          const handleChange = (selectTime: string, selectMechanic: IUser) => {
            setTime(selectTime)
            setMechanic(selectMechanic)
            field.onChange({ time: selectTime, responsible: selectMechanic.ci })
          }

          return (
            <>
              <TimePickerDialog onChange={handleChange} selectMechanic={mechanic} selectTime={time}>
                <div className="mt-1 flex items-center gap-2">
                  <div
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'default' }),
                      ' w-full cursor-pointer justify-start text-left font-normal',
                      !time && !mechanic && 'text-muted-foreground',
                    )}
                  >
                    <TimerIcon className="mr-2 h-4 w-4" />
                    {time && mechanic ? (
                      `${time} - ${mechanic.firstName} ${mechanic.lastName}`
                    ) : (
                      <span>Selecciona una hora</span>
                    )}
                  </div>
                </div>
              </TimePickerDialog>

              {getErrorMessage(`${name}.time`) && (
                <p className="mt-1 max-w-52 text-sm text-red-500">{getErrorMessage(`${name}.time`)}</p>
              )}
              {getErrorMessage(`${name}.responsible`) && (
                <p className="max-w-52 text-sm text-red-500">{getErrorMessage(`${name}.responsible`)}</p>
              )}
            </>
          )
        }}
      />
    </div>
  )
}

export default RHFTimePickerByMechanic
