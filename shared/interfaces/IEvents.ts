export interface IEvents {
  [key: string]: IEvent[]
}

export interface IEvent {
  id: number
  title: string
  label: string
  startTime: string
  endTime?: string
  status?: string
  owner?: string
  description?: string
  color: string
}

export interface IEventsDayInWeek {
  [key: string]: IEventsHour
}

export interface IEventsHour {
  events1: IEvent[]
  events2: IEvent[]
}
