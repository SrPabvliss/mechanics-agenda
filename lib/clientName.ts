export const clientLastName = (name: string) => {
  const lastNameSplit = name.split(' ')
  return lastNameSplit[lastNameSplit.length - 1]
}
