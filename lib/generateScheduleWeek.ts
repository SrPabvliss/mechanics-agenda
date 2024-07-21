import { IScheduleInterval, IScheduleWeek } from '@/shared/interfaces/ISchedule'

export const generateScheduleWeek = (schedule: IScheduleInterval): IScheduleWeek[] => {
  const startHour = parseInt(schedule.startTime.split(':')[0], 10)
  const endHour = parseInt(schedule.endTime.split(':')[0], 10)

  const scheduleWeek: IScheduleWeek[] = []

  for (let hour = startHour; hour <= endHour; hour++) {
    const formattedHour = hour.toString().padStart(2, '0') + ':00'
    scheduleWeek.push({ hour: formattedHour, events: {} })
  }
  return scheduleWeek
}
