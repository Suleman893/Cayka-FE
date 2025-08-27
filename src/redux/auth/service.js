//Third Party Imports
import { toast } from 'react-toastify'

//Utils Imports
import { PublicAPI, ProtectedAPI } from '@utils/axiosSetup'

//Constants Imports
import httpStatus from '@constants/httpStatus'

const login = async content => {
  const res = await PublicAPI.post('/super-admin/login', content.payload)

  if (res.data.status === httpStatus.OK) {
    toast.success('Login successful')
    content.router.push('/dashboard')

    return res.data.data
  }
}

const forgotPassword = async content => {
  const res = await PublicAPI.post('/super-admin/forget-password', content.payload)

  if (res.data.status === httpStatus.OK) {
    toast.success('Email sent to reset password')
  }
}

const resetPassword = async content => {
  const res = await PublicAPI.post('/super-admin/reset-password', content.payload)

  if (res.data.status === httpStatus.OK) {
    toast.success('Password updated successfully')
    content.router.push('/login')
  }
}

const renewAccessToken = async content => {
  const res = await ProtectedAPI.get('/auth/refresh', {
    headers: {
      refreshToken: `${content?.refreshToken}`
    }
  })

  if (res.data.status === httpStatus.OK) {
    return res.data?.data?.accessToken
  }
}



const authService = {
  login,
  forgotPassword,
  resetPassword,
  renewAccessToken,
}

export default authService
