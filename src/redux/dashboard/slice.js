//Third party Imports
import { createSlice } from '@reduxjs/toolkit'

//Thunks Imports
import { basicAnalytics, recentBrands } from '@redux/dashboard/thunk'

//State Import
import { initialState } from './initialState'

export const brandSlice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(basicAnalytics.pending, state => {
        state.isBasicAnalyticsLoading = true
      })
      .addCase(basicAnalytics.fulfilled, (state, action) => {
        state.isBasicAnalyticsLoading = false
        state.isBasicAnalyticsSuccess = true
        state.basicAnalytic = action.payload
      })
      .addCase(basicAnalytics.rejected, state => {
        state.isBasicAnalyticsLoading = false
        state.isError = true
      })
      .addCase(recentBrands.pending, state => {
        state.isBrandLoading = true
      })
      .addCase(recentBrands.fulfilled, (state, action) => {
        state.isBrandLoading = false
        state.isSuccess = true
        state.brands = action.payload
      })
      .addCase(recentBrands.rejected, state => {
        state.isBrandLoading = false
        state.isError = true
      })
  }
})

export default brandSlice.reducer
