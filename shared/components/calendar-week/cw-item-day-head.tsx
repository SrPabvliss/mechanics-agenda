import { IDay } from '@/shared/interfaces/ICalendar'

interface CWItemDayWeekProps {
  day: string
  week: IDay[]
  index: number
}

const CWItemDayHead = ({ day, index, week }: CWItemDayWeekProps) => {
  return (
    <div className=" flex flex-col text-center" style={{ borderLeft: '1px dashed' }}>
      <span className="font-medium text-blue-900 dark:text-white">{day}</span>
      <span className="text-blue-900 dark:text-white">{week[index]?.day}</span>
    </div>
  )
}

export default CWItemDayHead
