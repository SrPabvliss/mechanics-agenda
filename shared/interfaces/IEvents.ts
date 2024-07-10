export interface IEvents {
  [key: string]: IEvent[]
}

export interface IEvent {
  id: number
  label: string
  startTime: string
  endTime?: string
  color?: string
}
