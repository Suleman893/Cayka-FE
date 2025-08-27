import moment from 'moment'

//Method to convert string in Snake casing to Pascal casing, converting backend enum responses into better readable format

export const snakeToPascalConverter = value => {
  if (!value) return ''

  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

//Method to convert timestamp into D/M/YYYY format

export const formatTimestampToDate = value => {
  if (!value) return ''

  return moment(value).format('D/M/YYYY')
}

//Method to return success, default colors based on status, usage in the tables columns

export const statusColor = value => {
  if (!value) return 'default'

  return value == 'active' || value == 'online' ? 'success' : 'default'
}

//Method to return the user fullname, combining first name and last name of user

export const getFullName = (fName, lName) => {
  if (!fName && !lName) return ''

  return fName.concat(' ', lName ?? '')
}

//Method to get the user phone number, dial code and country based on the api response phone number, usage in Edit user

export const extractPhoneNo = (phoneNo, countries) => {
  for (const country of countries) {
    if (phoneNo.startsWith(country?.dialCode)) {
      return {
        countryCode: country?.dialCode,
        phone: phoneNo.slice(country?.dialCode?.length),
        country: country
      }
    }
  }

  return { countryCode: '+1', phone: 0, country: 'US' }
}

export const isValidFileType = (file, allowedTypes = ['csv', 'xls', 'xlsx']) => {
  if (!file) return false
  const fileExtension = file.name.split('.').pop().toLowerCase()

  return allowedTypes.includes(fileExtension)
}

//Create Query Params
// export const generateQueryParams = params => {
//   return new URLSearchParams(params).toString()
// }

export const generateQueryParams = params => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value != null && value !== '')
  )

  return new URLSearchParams(filteredParams).toString()
}

export const capitalizeFirstLetter = str => {
  if (!str || typeof str !== 'string') return str

  return str.charAt(0).toUpperCase() + str.slice(1)
}
