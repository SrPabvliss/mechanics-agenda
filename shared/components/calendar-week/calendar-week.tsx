'use client'
import { daysOfWeek } from '@/shared/constants/calendar'
import useScrollById from '@/shared/hooks/use-scroll-by-id'
import useCalendarWeek from '@/shared/hooks/useCalendarWeek'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'

import { ScrollArea } from '@/components/ui/scroll-area'

import { getCurrentHour } from '@/lib/getCurrentHour'

import LoadingBar from '../loading-bar/loading-bar'
import CWHeader from './cw-header'
import CWItemDayHead from './cw-item-day-head'
import CWItemWeek from './cw-item-week'

interface CalendarWeekProps {
  schedule: IScheduleWeek[]
  isLoading?: boolean
  onChange: (date1: string, date2: string) => void
  onClick: (date: string) => void
}

const CalendarWeek = ({ onChange, onClick, schedule: scheduleWithEvents, isLoading }: CalendarWeekProps) => {
  const { week, date, setDate, schedule, handleClickEvent } = useCalendarWeek({
    scheduleWithEvents,
    onChange,
    onClick,
  })

  useScrollById(getCurrentHour(), !!week.length)

  return (
    <div className="h-[calc(100vh_-_256px)] w-full">
      <CWHeader date={date} setDate={setDate} />
      <div className="mt-2 grid grid-cols-8" style={{ borderRight: '1px dashed' }}>
        <div></div>
        {daysOfWeek.map((day, index) => (
          <CWItemDayHead key={day} day={day} index={index} week={week} />
        ))}
        {isLoading && (
          <>
            <div></div>
            <div className="z-50 col-span-7 -mb-1">
              <LoadingBar />
            </div>
          </>
        )}
      </div>
      <ScrollArea className="h-full">
        <ul className="grid grid-cols-8" style={{ borderRight: '1px dashed' }}>
          {schedule.map((item) => (
            <CWItemWeek key={item.hour} week={week} schedule={item} onClick={handleClickEvent} />
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}

export default CalendarWeek
