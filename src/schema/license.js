import * as yup from 'yup'

export const renewLicenseSchema = yup.object({
  endDate: yup.date().required('End date is required').typeError('Invalid date')
})
