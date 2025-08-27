//Third Party Imports
import { toast } from 'react-toastify'

//Utils Imports
import { ProtectedAPI } from '@utils/axiosSetup'
import { generateQueryParams } from '@utils/common'

//Constants Imports
import httpStatus from '@constants/httpStatus'

const uploadDevices = async content => {
  const res = await ProtectedAPI.post(`/brand-device`, content.data)

  if (res.status === httpStatus.CREATED || res?.data?.status === httpStatus.CREATED) {
    content.setOpen(false)
    toast.success('Devices uploaded successfully')
  }
}

const allAssignedDevices = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/brand-device/brands?${query}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

//To conditionally render different views for Unassigned Inventory/Upload Device
const inventoryExists = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/brand-device?${query}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data.pagination
  }
}

//For table listing, usage in Unassigned Devices Page Table
const allInventoryDevices = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/brand-device?${query}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

// For dropdown, usage in Device Assignment Modal in Unassigned Devices Page Table
const allUnassignedDevices = async content => {
  const query = generateQueryParams(content)

  const res = await ProtectedAPI.get(`/brand-device?${query}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const assignDevicesToBrand = async content => {
  const { brandId, brandPurchaseOrderId, data, handleClose } = content

  const res = await ProtectedAPI.post(
    `/brand-device/brand/${brandId}/brand-purchase-order/${brandPurchaseOrderId}`,
    data
  )

  if (res.status === httpStatus.CREATED || res?.data?.status === httpStatus.CREATED) {
    toast.success('Devices assigned successfully')
    handleClose()
  }
}

const unAssignDevice = async content => {
  const { id, setOpen } = content

  const res = await ProtectedAPI.put(`/brand-device/unassign/${id}`)

  if (res.status === httpStatus.OK) {
    toast.success('Device unassigned successfully')
    setOpen(false)
  }
}

const deleteUnassignDevice = async content => {
  const { id, setOpen } = content

  const res = await ProtectedAPI.delete(`/brand-device/${id}`)

  if (res.status === httpStatus.OK) {
    toast.success('Device delete successfully')
    setOpen(false)
  }
}

const deviceDetail = async content => {
  const { id } = content
  const res = await ProtectedAPI.get(`/brand-device/${id}`)

  if (res.data.status === httpStatus.OK) {
    return res.data.data
  }
}

const changeStatus = async content => {
  const { id, status } = content

  const res = await ProtectedAPI.put(`/brand-device/${id}`, {
    status: status
  })

  if (res.data.status === httpStatus.OK) {
    content.setOpen(false)
    toast.success('Device status updated successfully')
  }
}

const deviceService = {
  inventoryExists,
  uploadDevices,
  allAssignedDevices,
  allUnassignedDevices,
  allInventoryDevices,
  assignDevicesToBrand,
  unAssignDevice,
  deleteUnassignDevice,
  deviceDetail,
  changeStatus
}

export default deviceService
