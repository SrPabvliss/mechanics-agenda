import { generateScheduleWeek } from '@/lib/generateScheduleWeek'

import { IScheduleWeek } from '../interfaces/ISchedule'
import { fullSchedule, workingHours } from './schedule'

export const scheduleWeek: IScheduleWeek[] = generateScheduleWeek(workingHours)

export const scheduleWeekFull: IScheduleWeek[] = generateScheduleWeek(fullSchedule)
