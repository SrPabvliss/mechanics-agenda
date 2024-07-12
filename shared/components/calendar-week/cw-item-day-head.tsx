interface CWItemDayWeekProps {
  day: string
  week: any[]
  index: number
}

const CWItemDayHead = ({ day, index, week }: CWItemDayWeekProps) => {
  return (
    <div className=" flex flex-col border-l-[1.5px] border-dashed border-blue-400 text-center text-blue-900 dark:text-white">
      <span className="font-medium">{day}</span>
      <span>{week[index]?.day}</span>
    </div>
  )
}

export default CWItemDayHead
