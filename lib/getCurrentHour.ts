import dayjs from 'dayjs'

export const getCurrentHour = (): string => {
  const now = dayjs()
  const roundedHour = now.format('HH:00')
  return roundedHour
}
