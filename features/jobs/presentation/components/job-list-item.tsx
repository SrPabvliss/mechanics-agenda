// components/JobListItem.tsx
import { CircleCheck, CircleDashed, EllipsisVertical, Pencil, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useJobMethods } from '../../hooks/use-job-methods'
import { IJob } from '../../models/IJob'
import { EditFormDialog } from './edit-job-form'

interface Props {
  job: IJob
}

export const JobListItem = ({ job }: Props) => {
  const { handleToggleStatus, handleDeleteJob } = useJobMethods()

  return (
    <Card key={job.id} className="relative mt-3 flex items-center gap-4 p-4">
      <div
        className={`absolute left-0 top-0 h-full w-5 rounded-l-lg ${
          job.status === 'COMPLETED' ? 'bg-green-500' : 'bg-red-500'
        }`}
      ></div>
      <span className="ml-4 flex-1">{job.name}</span>
      <div className="flex items-center gap-1">
        <Button variant="outline" size={'icon'} onClick={() => handleToggleStatus(job.id.toString(), job.status)}>
          {job.status === 'COMPLETED' ? <CircleDashed size={20} /> : <CircleCheck size={20} />}
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size={'icon'}>
              <EllipsisVertical size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div className="flex flex-col gap-1 p-2">
              <EditFormDialog job={job}>
                <Button variant="outline" size={'icon'}>
                  <Pencil size={20} />
                </Button>
              </EditFormDialog>
              <Button variant="outline" size={'icon'} onClick={() => handleDeleteJob(job.id.toString())}>
                <Trash size={20} />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  )
}
