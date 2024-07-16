export interface IEvents<T extends IEvent = IEvent> {
  [key: string]: T[]
}

export interface IEvent {
  id: number
  title: string
  label: string
  startTime: string
  color: string
}

export interface IQuoteEvent extends IEvent {
  endTime: string
}

export interface IAdminQuoteEvent extends IEvent {}

export interface IReviewEvent extends IEvent {
  endTime: string
  status?: string
  owner?: string
  description?: string
}

export type EventType = IQuoteEvent | IAdminQuoteEvent | IReviewEvent

export interface IEventsDayInWeek {
  [key: string]: IEventsHour
}

export interface IEventsHour {
  events1: IEvent[]
  events2: IEvent[]
}
