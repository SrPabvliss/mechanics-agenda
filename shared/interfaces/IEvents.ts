export interface IEvent {
  id: number
  title: string
  label?: string
  startTime: string
  color: string
}

export interface IQuoteEvent extends IEvent {}

export interface IAdminQuoteEvent extends IEvent {}

export interface IReviewEvent extends IEvent {
  endTime: string
  status: string
  owner: string
  description?: string
}

export type EventType = IQuoteEvent | IAdminQuoteEvent | IReviewEvent

export interface IEventsHour<T> {
  events1: T
  events2: T
}

export interface EventsRecord<T> {
  [key: string]: T
}

export type IReviewEventsDay = IReviewEvent[]

export type IEvents = EventsRecord<IEventsHour<IEvent[]>>
export type IEventsMechanic = EventsRecord<IEventsHour<boolean>>

export type IEventsMonth<T extends IEvent = IEvent> = EventsRecord<T[]>

export type IReviewEventsMonth = IEventsMonth<IReviewEvent>
export type IQuoteEventsMonth = IEventsMonth<IQuoteEvent>
export type IAdminQuoteEventsMonth = IEventsMonth<IAdminQuoteEvent>
