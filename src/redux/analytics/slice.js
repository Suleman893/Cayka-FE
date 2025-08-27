//Third party Imports
import { createSlice } from '@reduxjs/toolkit'

//Thunks Imports
import { allDevices } from '@redux/analytics/thunk'

//State Import
import { initialState } from './initialState'

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(allDevices.pending, state => {
        state.isLoading = true
      })
      .addCase(allDevices.fulfilled, (state, action) => {
        state.isLoading = false
        state.devices = action.payload
        state.isSuccess = true
      })
      .addCase(allDevices.rejected, state => {
        state.isLoading = false
        state.isError = true
      })
  }
})

export default analyticsSlice.reducer
