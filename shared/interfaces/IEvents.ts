export interface IEvents {
  [key: string]: IEvent[]
}

export interface IEvent {
  id: number
  title: string
  label: string
  startTime: string
  endTime?: string
  color: string
}
