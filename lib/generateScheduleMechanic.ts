import { IScheduleInterval, IScheduleMechanic } from '@/shared/interfaces/ISchedule'

export const generateScheduleMechanic = (schedule: IScheduleInterval): IScheduleMechanic[] => {
  const startHour = parseInt(schedule.startTime.split(':')[0], 10)
  const endHour = parseInt(schedule.endTime.split(':')[0], 10)

  const scheduleMechanic: IScheduleMechanic[] = []

  for (let hour = startHour; hour <= endHour; hour++) {
    const formattedHour = hour.toString().padStart(2, '0') + ':00'
    scheduleMechanic.push({ hour: formattedHour, events: {} })
  }

  return scheduleMechanic
}
