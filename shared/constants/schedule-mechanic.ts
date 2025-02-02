import { generateScheduleMechanic } from '@/lib/generateScheduleMechanic'

import { IScheduleMechanic } from '../interfaces/ISchedule'
import { workingHours } from './schedule'

export const scheduleMechanic: IScheduleMechanic[] = generateScheduleMechanic(workingHours)
