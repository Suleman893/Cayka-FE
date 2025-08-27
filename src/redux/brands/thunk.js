//Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

//API Service Import
import brandService from '@redux/brands/service'

//Helpers Imports
import { addBrandFormat } from '@helpers/payloadFormat'

export const addBrand = createAsyncThunk('brand/add', async (content, thunkAPI) => {
  try {
    //Formatting according to payload
    const formattedPayload = addBrandFormat(content)

    return await brandService.addBrand({
      data: formattedPayload,
      handleClose: content.handleClose
    })
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const allBrands = createAsyncThunk('brand/all', async (content, thunkAPI) => {
  try {
    return await brandService.allBrands(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const brandDetail = createAsyncThunk('brand/detail', async (content, thunkAPI) => {
  try {
    return await brandService.brandDetail(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const changeStatus = createAsyncThunk('brand/status', async (content, thunkAPI) => {
  try {
    return await brandService.changeStatus(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const addPurchaseOrder = createAsyncThunk('brand/add-purchase-order', async (content, thunkAPI) => {
  try {
    return await brandService.addPurchaseOrder(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const allPurchaseOrders = createAsyncThunk('brand/purchase-order', async (content, thunkAPI) => {
  try {
    return await brandService.allPurchaseOrders(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    // toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const deletePurchaseOrder = createAsyncThunk('brand/delete-purchase-order', async (content, thunkAPI) => {
  try {
    return await brandService.deletePurchaseOrder(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const addInvoice = createAsyncThunk('brand/add-invoice', async (content, thunkAPI) => {
  try {
    return await brandService.addInvoice(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const allPODevices = createAsyncThunk('brand/purchase-order-devices', async (content, thunkAPI) => {
  try {
    return await brandService.allPODevices(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    // toast.error(message)

    return thunkAPI.rejectWithValue(message)
  }
})

export const allBrandAdmins = createAsyncThunk('brand/brand-admin', async (content, thunkAPI) => {
  try {
    return await brandService.allBrandAdmins(content)
  } catch (err) {
    const message = err?.response?.data?.message || 'Server Error'

    return thunkAPI.rejectWithValue(message)
  }
})
