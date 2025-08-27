//Utils Imports
import { ProtectedAPI } from '@utils/axiosSetup'
import { generateQueryParams } from '@utils/common'

//Constants Imports
import httpStatus from '@constants/httpStatus'

const allDevices = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/brand-device/all?${query}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const deviceService = {
  allDevices
}

export default deviceService
