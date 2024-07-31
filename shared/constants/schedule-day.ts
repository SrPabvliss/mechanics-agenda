import { generateScheduleDay } from '@/lib/generateScheduleDay'

import { IDailySchedule } from '../interfaces/ISchedule'
import { fullSchedule, workingHours } from './schedule'

export const scheduleDay: IDailySchedule[] = generateScheduleDay(workingHours)

export const scheduleDayFull: IDailySchedule[] = generateScheduleDay(fullSchedule)
