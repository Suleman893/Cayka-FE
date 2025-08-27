//Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

//API Service Import
import authService from '@redux/auth/service'

export const login = createAsyncThunk('auth/login', async (content, thunkAPI) => {
  try {
    return await authService.login(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (content, thunkAPI) => {
  try {
    return await authService.forgotPassword(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async (content, thunkAPI) => {
  try {
    return await authService.resetPassword(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const renewAccessToken = createAsyncThunk('auth/refresh', async (content, thunkAPI) => {
  try {
    return await authService.renewAccessToken(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    return thunkAPI.rejectWithValue(message)
  }
})

