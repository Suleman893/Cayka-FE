export const consumerStatusCheck = isVerified => {
  return isVerified === true ? 'Active' : 'Inactive'
}

export const consumerStatusColor = isVerified => {
  if (!isVerified) return 'default'

  return isVerified === true ? 'success' : 'default'
}
