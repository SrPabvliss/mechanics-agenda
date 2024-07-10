import { IEvent } from './IEvents'

export interface ISchedule {
  id: number
  hour: string
  activities1: IEvent[]
  activities2: IEvent[]
}
