import { IScheduleInterval } from '../interfaces/ISchedule'

export const workingHours: IScheduleInterval = {
  startTime: '08:00',
  endTime: '16:59',
}

export const lunchTime: IScheduleInterval = {
  startTime: '13:00',
  endTime: '14:00',
}

export const fullSchedule: IScheduleInterval = {
  startTime: '00:00',
  endTime: '23:59',
}
