//Third Party Imports
import { toast } from 'react-toastify'

//Utils Imports
import { ProtectedAPI } from '@utils/axiosSetup'
import { generateQueryParams } from '@utils/common'

//Constants Imports
import httpStatus from '@constants/httpStatus'

const addBrand = async content => {
  const res = await ProtectedAPI.post(`/brand`, content.data)

  if (res.data.status === httpStatus.CREATED) {
    toast.success('Brand created successfully')
    content.handleClose(false)
  }
}

const allBrands = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/brand?${query}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const brandDetail = async content => {
  const { id } = content
  const res = await ProtectedAPI.get(`/brand/${id}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const changeStatus = async content => {
  const { id, status } = content

  const res = await ProtectedAPI.put(`/brand/${id}`, {
    status: status
  })

  if (res.data.status === httpStatus.OK) {
    content.setOpen(false)
    toast.success('Brand status updated successfully')
  }
}

const addPurchaseOrder = async content => {
  const { id } = content
  const res = await ProtectedAPI.post(`/brand-purchase-order/${id}`)

  if (res.data.status === httpStatus.CREATED) {
    content.setOpen(false)
    toast.success('Purchase order created successfully')
  }
}

const allPurchaseOrders = async content => {
  const { id, ...query } = content

  const decodedQuery = generateQueryParams(query)

  const res = await ProtectedAPI.get(`/brand-purchase-order/${id}?${decodedQuery}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const deletePurchaseOrder = async content => {
  const { id } = content

  const res = await ProtectedAPI.delete(`brand-purchase-order/${id}`)

  if (res.data.status === httpStatus.OK) {
    content.setOpen(false)
    toast.success('Purchase order deleted successfully')
  }
}

const addInvoice = async content => {
  const { id, data } = content
  const res = await ProtectedAPI.put(`brand-purchase-order/${id}`, data)

  if (res.data.status === httpStatus.OK) {
    content.setOpen(false)
    toast.success('Invoice Id added successfully')
  }
}

const allPODevices = async content => {
  const { id, ...query } = content

  const decodedQuery = generateQueryParams(query)

  const res = await ProtectedAPI.get(`/brand-device/brand-purchase-order/${id}?${decodedQuery}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const allBrandAdmins = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/brand-admin?${query}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const brandService = {
  addBrand,
  allBrands,
  brandDetail,
  changeStatus,
  addPurchaseOrder,
  allPurchaseOrders,
  deletePurchaseOrder,
  addInvoice,
  allPODevices,
  allBrandAdmins
}

export default brandService
