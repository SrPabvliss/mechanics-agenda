import { lunchTime } from '@/shared/constants/schedule'

export const validLunchTime = (time: string): boolean => {
  const timeToCheck = new Date(`01/01/2021 ${time}`)
  const startTime = new Date(`01/01/2021 ${lunchTime.startTime}`)
  const endTime = new Date(`01/01/2021 ${lunchTime.endTime}`)
  return timeToCheck >= startTime && timeToCheck < endTime
}
