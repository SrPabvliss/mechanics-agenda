export const getPlateAndTitle = (title: string) => {
  const parts = title.split(' - ')
  if (parts.length >= 3) {
    const plate = parts.slice(-1).join(' - ')
    const newTitle = parts.slice(0, -1).join(' - ')
    return { plate, newTitle }
  }
  return { plate: null, newTitle: title }
}
