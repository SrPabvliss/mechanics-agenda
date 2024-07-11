import { IEvent, IEventsDayInWeek } from './IEvents'

export interface ISchedule {
  id: number
  hour: string
  activities1: IEvent[]
  activities2: IEvent[]
}

export interface IScheduleWeek {
  hour: string
  events: IEventsDayInWeek
}
