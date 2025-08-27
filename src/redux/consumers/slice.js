//Third party Imports
import { createSlice } from '@reduxjs/toolkit'

//Thunks Imports
import { allConsumerDevices, allConsumers, consumerDetails, changeStatus } from '@redux/consumers/thunk'

//State Import
import { initialState } from '@redux/consumers/initialState'

export const consumerSlice = createSlice({
  name: 'consumer',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(allConsumers.pending, state => {
        state.isConsumerLoading = true
      })
      .addCase(allConsumers.fulfilled, (state, action) => {
        state.isConsumerLoading = false
        state.isSuccess = true
        state.consumers = action.payload
      })
      .addCase(allConsumers.rejected, state => {
        state.isConsumerLoading = false
        state.isError = true
      })
      .addCase(consumerDetails.pending, state => {
        state.isConsumerDetailLoading = true
      })
      .addCase(consumerDetails.fulfilled, (state, action) => {
        state.isConsumerDetailLoading = false
        state.consumerDetail = action.payload
        state.isSuccess = true
      })
      .addCase(consumerDetails.rejected, state => {
        state.isConsumerDetailLoading = false
        state.isError = true
      })
      .addCase(allConsumerDevices.pending, state => {
        state.isConsumerDeviceLoading = true
      })
      .addCase(allConsumerDevices.fulfilled, (state, action) => {
        state.isConsumerDeviceLoading = false
        state.consumerDevices = action.payload
      })
      .addCase(allConsumerDevices.rejected, state => {
        state.isConsumerDeviceLoading = false
      })
      .addCase(changeStatus.pending, state => {
        state.isStatusChangeLoading = true
      })
      .addCase(changeStatus.fulfilled, state => {
        state.isStatusChangeLoading = false
        state.isStatusChangeSuccess = !state.isStatusChangeSuccess
      })
      .addCase(changeStatus.rejected, state => {
        state.isStatusChangeLoading = false
        state.isError = true
      })
  }
})

export default consumerSlice.reducer
