//Third Party Imports
import { toast } from 'react-toastify'

//Constants Imports
import httpStatus from '@constants/httpStatus'

//Utils Imports
import { ProtectedAPI } from '@utils/axiosSetup'

const loggedInUser = async content => {
  const res = await ProtectedAPI.get('/auth/user')

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const updateProfile = async content => {
  const { data, setOpen } = content
  const res = await ProtectedAPI.put('/super-admin/update-info', data)

  if (res.data.status === httpStatus.OK) {
    toast.success('Profile updated successfully')
    setOpen(false)

    return res.data.data
  }
}

const changePassword = async content => {
  const { data } = content
  const res = await ProtectedAPI.put('/super-admin/change-password', data)

  if (res.data.status === httpStatus.OK) {
    toast.success('Password updated successfully')
    content.reset()
  }
}

const userService = {
  loggedInUser,
  updateProfile,
  changePassword
}

export default userService
