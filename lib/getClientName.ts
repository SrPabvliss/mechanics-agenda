export const getClientLastName = (name: string) => {
  const lastNameSplit = name.trim().split(' ')
  return lastNameSplit[lastNameSplit.length - 1]
}
