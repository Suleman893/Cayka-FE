//Third Party Imports
import { toast } from 'react-toastify'

//Utils Imports
import { ProtectedAPI } from '@utils/axiosSetup'
import { generateQueryParams } from '@utils/common'

//Constants Imports
import httpStatus from '@constants/httpStatus'

const allLicenses = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/brand-license?${query}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const renewLicense = async content => {
  const { id, data } = content

  const res = await ProtectedAPI.put(`/brand-license/${id}`, data)

  if (res.data.status === httpStatus.OK) {
    toast.success('License renewed successfully')
    content.setOpen(false)
  }
}

const revokeLicense = async content => {
  const { id, data } = content

  const res = await ProtectedAPI.put(`/brand-license/${id}`, data)

  if (res.data.status === httpStatus.OK) {
    toast.success('License revoked successfully')
    content.setOpen(false)
  }
}

const licenseService = {
  allLicenses,
  renewLicense,
  revokeLicense
}

export default licenseService
