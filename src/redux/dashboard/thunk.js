//Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

//API Service Import
import dashboardService from '@redux/dashboard/service'

export const basicAnalytics = createAsyncThunk('dashboard/basic-analytics', async (_, thunkAPI) => {
  try {
    return await dashboardService.basicAnalytics()
  } catch (err) {
    const message = 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const recentBrands = createAsyncThunk('dashboard/recent-brands', async (content, thunkAPI) => {
  try {
    return await dashboardService.recentBrands(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})
