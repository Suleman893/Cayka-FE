import * as yup from 'yup'

export const updateProfileSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .trim()
    .matches(/^[a-zA-Z]+$/, 'Only alphabetic characters are allowed without spaces')
    .min(2, 'First name must be at least 2 characters long')
    .max(30, 'First name must be at most 30 characters long'),
  lastName: yup
    .string()
    .required('Last name is required')
    .trim()
    .matches(/^[a-zA-Z ]+$/, 'Only alphabetic characters are allowed')
    .min(2, 'Last name must be at least 2 characters long')
    .max(30, 'Last name must be at most 30 characters long'),
  country: yup.string().required('Country is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .trim()
    .matches(/^[1-9][0-9]*$/, 'Phone number must be a positive number')
    .min(5, 'Phone must be at least 5 characters long')
    .max(12, 'Phone must be at most 12 characters long'),
  address: yup.string().required('Address is required').trim().max(100, 'Address must be at most 100 characters long')
})

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Current password is required')
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must be at most 32 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character'),
  newPassword: yup
    .string()
    .required('New password is required')
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must be at most 32 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must be at most 32 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .oneOf([yup.ref('newPassword')], 'Confirm password must match new password')
})
