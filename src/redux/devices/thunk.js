//Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

//API Service Import
import deviceService from '@redux/devices/service'

//Helpers Imports
import { deviceAssignmentFormat } from '@helpers/payloadFormat'

export const uploadDevices = createAsyncThunk('device/upload', async (content, thunkAPI) => {
  const formData = new FormData()

  formData.append('file', content.file)

  try {
    return await deviceService.uploadDevices({
      data: formData,
      setOpen: content.setOpen
    })
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const allAssignedDevices = createAsyncThunk('device/assigned-devices', async (content, thunkAPI) => {
  try {
    return await deviceService.allAssignedDevices(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

//To conditionally render different views for Unassigned Inventory/Upload Device
export const inventoryExists = createAsyncThunk('device/inventory-exists', async (content, thunkAPI) => {
  try {
    const resp = await deviceService.inventoryExists(content)

    return resp?.totalElements ? true : false
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

//For table listing, usage in Unassigned Devices Page Table
export const allInventoryDevices = createAsyncThunk('device/inventory-devices', async (content, thunkAPI) => {
  try {
    return await deviceService.allUnassignedDevices(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

// For dropdown, usage in Device Assignment Modal in Unassigned Devices Page Table
export const allUnassignedDevices = createAsyncThunk('device/unassigned-devices', async (content, thunkAPI) => {
  try {
    return await deviceService.allUnassignedDevices(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const assignDevicesToBrand = createAsyncThunk('device/assign-devices', async (content, thunkAPI) => {
  try {
    const { data, handleClose } = content

    const formattedPayload = deviceAssignmentFormat(data)

    const { brandId, brandPurchaseOrderId, ...payloadData } = formattedPayload

    return await deviceService.assignDevicesToBrand({
      brandId,
      brandPurchaseOrderId,
      data: payloadData,
      handleClose
    })
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const unAssignDevice = createAsyncThunk('device/unassign-device', async (content, thunkAPI) => {
  try {
    return await deviceService.unAssignDevice(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteUnassignDevice = createAsyncThunk('device/delete-device', async (content, thunkAPI) => {
  try {
    return await deviceService.deleteUnassignDevice(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const deviceDetail = createAsyncThunk('device/detail', async (content, thunkAPI) => {
  try {
    return await deviceService.deviceDetail(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const changeStatus = createAsyncThunk('device/status', async (content, thunkAPI) => {
  try {
    return await deviceService.changeStatus(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})
