//Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

//API Service Import
import licenseService from '@redux/license/service'

export const allLicenses = createAsyncThunk('license/all', async (content, thunkAPI) => {
  try {
    return await licenseService.allLicenses(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const renewLicense = createAsyncThunk('license/renew', async (content, thunkAPI) => {
  try {
    return await licenseService.renewLicense(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const revokeLicense = createAsyncThunk('license/revoke', async (content, thunkAPI) => {
  try {
    return await licenseService.revokeLicense(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})
