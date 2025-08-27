//Utils Imports
import { ProtectedAPI } from '@utils/axiosSetup'
import { generateQueryParams } from '@utils/common'

//Constants Imports
import httpStatus from '@constants/httpStatus'

const basicAnalytics = async _ => {
  const res = await ProtectedAPI.get('/super-admin/dashboard/stats')

  if (res.data.status === httpStatus.OK) {
    return res?.data?.data
  }
}

const recentBrands = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/brand?${query}`, content)

  if (res.data.status === httpStatus.OK) {
    return res?.data?.data?.items
  }
}

const dashboardService = {
  basicAnalytics,
  recentBrands
}

export default dashboardService
