import { generateScheduleMechanic } from '@/lib/generateScheduleMechanic'

import { IScheduleMechanic } from '../interfaces/ISchedule'
import { scheduleInterval } from './schedule'

export const scheduleMechanic: IScheduleMechanic[] = generateScheduleMechanic(scheduleInterval)
