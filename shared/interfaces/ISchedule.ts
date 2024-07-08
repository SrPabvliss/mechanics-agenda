export interface IActivity {
  id: number
  startTime: string
  endTime?: string
  title: string
  label: string
  color: string
}

export interface ISchedule {
  id: number
  hour: string
  activities1: IActivity[]
  activities2: IActivity[]
}
