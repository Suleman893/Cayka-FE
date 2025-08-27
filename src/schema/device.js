import * as yup from 'yup'

export const assignDeviceSchema = yup.object({
  brand: yup.object().required('Brand is required'),
  brandPurchaseOrder: yup.object().required('Purchase Order is required'),
  devices: yup.array().min(1, 'At least one device is required').required('Devices are required'),
  invoiceId: yup
    .string()
    .optional()
    .trim()
    .max(50, 'Invoice id must be at most 50 characters long')
    .when({
      is: value => value && value.length > 0, // Apply matches only if value is not empty
      then: schema => schema.matches(/^\d+$/, 'Only numbers are allowed')
    })
})
