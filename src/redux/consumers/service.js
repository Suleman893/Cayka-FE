//Third Party Imports
import { toast } from 'react-toastify'

//Utils Imports
import { ProtectedAPI } from '@utils/axiosSetup'
import { generateQueryParams } from '@utils/common'

//Constants Imports
import httpStatus from '@constants/httpStatus'

const allConsumers = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/customer?${query}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const consumerDetail = async content => {
  const { id } = content
  const res = await ProtectedAPI.get(`/customer/detail/${id}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const allConsumerDevices = async content => {
  const { id, ...query } = content

  const decodedQuery = generateQueryParams(query)

  const res = await ProtectedAPI.get(`/customer/customer-device/${id}?${decodedQuery}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const changeStatus = async content => {
  const { id, isVerified } = content

  const res = await ProtectedAPI.put(`/customer/${id}`, {
    isVerified: isVerified
  })

  if (res.data.status === httpStatus.OK) {
    content.setOpen(false)
    toast.success('Consumer status updated successfully')
  }
}

const consumerService = {
  allConsumers,
  consumerDetail,
  allConsumerDevices,
  changeStatus
}

export default consumerService
