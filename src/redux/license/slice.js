//Third party Imports
import { createSlice } from '@reduxjs/toolkit'

//Thunks Imports
import { allLicenses, renewLicense, revokeLicense } from '@redux/license/thunk'

//State Import
import { initialState } from './initialState'

export const licenseSlice = createSlice({
  name: 'license',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(allLicenses.pending, state => {
        state.isLoading = true
      })
      .addCase(allLicenses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.licenses = action.payload
      })
      .addCase(allLicenses.rejected, state => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(renewLicense.pending, state => {
        state.isRenewLoading = true
      })
      .addCase(renewLicense.fulfilled, state => {
        state.isRenewLoading = false
        state.isRenewSuccess = !state.isRenewSuccess
      })
      .addCase(renewLicense.rejected, state => {
        state.isRenewLoading = false
        state.isError = true
      })
      .addCase(revokeLicense.pending, state => {
        state.isRevokeLoading = true
      })
      .addCase(revokeLicense.fulfilled, state => {
        state.isRevokeLoading = false
        state.isRevokeSuccess = !state.isRevokeSuccess
      })
      .addCase(revokeLicense.rejected, state => {
        state.isRevokeLoading = false
        state.isError = true
      })
  }
})

export default licenseSlice.reducer
