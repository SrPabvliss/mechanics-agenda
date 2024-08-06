export const getClientLastName = (name: string) => {
  const lastNameSplit = name.split(' ')
  return lastNameSplit[lastNameSplit.length - 1]
}
