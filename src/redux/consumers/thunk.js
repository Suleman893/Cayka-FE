//Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

//API Service Import
import consumerService from '@redux/consumers/service'

export const allConsumers = createAsyncThunk('consumer/all', async (content, thunkAPI) => {
  try {
    return await consumerService.allConsumers(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const consumerDetails = createAsyncThunk('consumer/detail', async (content, thunkAPI) => {
  try {
    return await consumerService.consumerDetail(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const allConsumerDevices = createAsyncThunk('consumer/devices', async (content, thunkAPI) => {
  try {
    return await consumerService.allConsumerDevices(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const changeStatus = createAsyncThunk('consumer/status', async (content, thunkAPI) => {
  try {
    return await consumerService.changeStatus(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})
