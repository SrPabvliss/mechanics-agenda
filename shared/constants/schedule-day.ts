import { generateScheduleDay } from '@/lib/generateScheduleDay'

import { IDailySchedule } from '../interfaces/ISchedule'
import { scheduleInterval } from './schedule'

export const scheduleDay: IDailySchedule[] = generateScheduleDay(scheduleInterval)
