import { IEvent, IEvents, IEventsMechanic } from './IEvents'

export interface IScheduleInterval {
  startTime: string
  endTime: string
}

export interface ISchedule<T> {
  hour: string
  events1: T[]
  events2: T[]
}

export interface IEventSchedule<T> {
  hour: string
  events: T
}

export interface IScheduleRecord<T> {
  [key: string]: T
}

export type IScheduleWeek = IEventSchedule<IEvents>

export type IScheduleMechanic = IEventSchedule<IEventsMechanic>

export type IScheduleMechanicRecord = IScheduleRecord<IScheduleMechanic[]>

export type IDailySchedule = ISchedule<IEvent>
