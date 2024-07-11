import { CalendarCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { formatMonthYear } from '@/lib/formatDate'

interface CWHeaderProps {
  date: string
  setDate: (date: string) => void
}

const CWHeader = ({ date, setDate }: CWHeaderProps) => {
  return (
    <div className="flex items-center text-blue-900 dark:text-white">
      <h1 className="w-full text-lg font-medium lg:text-xl">{formatMonthYear(date)}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-fit px-1 py-2">
            <CalendarCheck className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <Calendar onDayClick={(date) => setDate(date.toISOString())} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CWHeader
