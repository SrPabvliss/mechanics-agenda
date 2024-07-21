import { IDailySchedule, IScheduleInterval } from '@/shared/interfaces/ISchedule'

export const generateScheduleDay = (schedule: IScheduleInterval): IDailySchedule[] => {
  const startHour = parseInt(schedule.startTime.split(':')[0], 10)
  const endHour = parseInt(schedule.endTime.split(':')[0], 10)

  const scheduleDay: IDailySchedule[] = []

  for (let hour = startHour; hour <= endHour; hour++) {
    const formattedHour = hour.toString().padStart(2, '0') + ':00'
    scheduleDay.push({ hour: formattedHour, events1: [], events2: [] })
  }
  return scheduleDay
}
