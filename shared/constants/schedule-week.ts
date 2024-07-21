import { generateScheduleWeek } from '@/lib/generateScheduleWeek'
import { IScheduleWeek } from '../interfaces/ISchedule'
import { scheduleInterval } from './schedule'

export const scheduleWeek: IScheduleWeek[] = generateScheduleWeek(scheduleInterval)
