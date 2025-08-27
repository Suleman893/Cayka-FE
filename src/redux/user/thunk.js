//Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

//API Service Import
import userService from '@redux/user/service'

export const loggedInUser = createAsyncThunk('user/loggedin-user', async (content, thunkAPI) => {
  try {
    return await userService.loggedInUser(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    return thunkAPI.rejectWithValue(message)
  }
})

export const updateProfile = createAsyncThunk('user/update-profile', async (content, thunkAPI) => {
  try {
    const { selectedCountryCode, data } = content

    const transformPayload = data => {
      return {
        ...data,
        phone: selectedCountryCode + data.phone
      }
    }

    //Formatting according to payload
    const formattedData = transformPayload(data)

    return await userService.updateProfile({
      data: formattedData,
      setOpen: content.setOpen
    })
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const changePassword = createAsyncThunk('user/change-password', async (content, thunkAPI) => {
  try {
    return await userService.changePassword(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})
