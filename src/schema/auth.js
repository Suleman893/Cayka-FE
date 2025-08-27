import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required').trim(),
  password: yup
    .string()
    .required('Password is required')
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must be at most 32 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
})

export const forgotPassSchema = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required').trim()
})

export const resetPassSchema = yup.object({
  newPassword: yup
    .string()
    .required('Password is required')
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must be at most 32 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character'),
  confirmNewPassword: yup
    .string()
    .required('Confirm new Password is required')
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must be at most 32 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
})
