import * as yup from 'yup'
import dayjs from 'dayjs'

export const brandSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .trim()

    // .matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  address: yup
    .string()
    .required('Address is required')
    .trim()

    // .matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed')
    .max(100, 'Address must be at most 100 characters long'),
  country: yup.string().required('Country is required'),
  firstName: yup
    .string()
    .required('First name is required')
    .trim()
    .matches(/^[a-zA-Z]+$/, 'Only alphabetic characters are allowed without spaces')
    .min(2, 'First name must be at least 2 characters long')
    .max(30, 'First name must be at most 30 characters long'),

  // lastName: yup
  //   .string()
  //   .optional()
  //   .trim()
  //   .matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed')
  //   .max(30, 'Last name must be at most 30 characters long'),
  email: yup.string().email('Email is invalid').required('Email is required').trim(),
  phone: yup
    .string()
    .required('Phone is required')
    .trim()
    .matches(/^[1-9][0-9]*$/, 'Phone Number can only contain positive numbers.')
    .min(5, 'Phone must be at least 5 characters long')
    .max(12, 'Phone must be at most 12 characters long'),
  serverType: yup.string().required('Server type is required'),
  notes: yup.string().optional().trim().max(500, 'Note must be at most 500 characters long'),
  startDate: yup.date().required('Start date is required').typeError('Invalid date'),
  endDate: yup
    .date()
    .required('End date is required')
    .typeError('Invalid date')
    .min(yup.ref('startDate'), 'End date must be after start date')
    .test('one-day-ahead', 'End date must be at least one day ahead of start date', function (value) {
      const startDate = this.resolve(yup.ref('startDate'))

      return value && startDate ? dayjs(value).isAfter(dayjs(startDate), 'day') : true
    })
})

export const addInvoiceSchema = yup.object({
  invoiceId: yup
    .string()
    .required('Invoice Id is required')
    .trim()
    .matches(/^\d+$/, 'Only numbers are allowed')
    .max(50, 'Invoice id must be at most 50 characters long')
})
