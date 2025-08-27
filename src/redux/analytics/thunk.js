//Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

//API Service Import
import deviceService from '@redux/analytics/service'

export const allDevices = createAsyncThunk('device/all-devices', async (content, thunkAPI) => {
  try {
    return await deviceService.allDevices(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})
