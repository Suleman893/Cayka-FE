//Third party Imports
import { createSlice } from '@reduxjs/toolkit'

//Thunks Imports
import { loggedInUser, updateProfile, changePassword } from '@redux/user/thunk'

//State Import
import { initialState } from './initialState'

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loggedInUser.pending, state => {
        state.isLoading = true
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = action.payload
      })
      .addCase(loggedInUser.rejected, state => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(updateProfile.pending, state => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isUpdateProfileSuccess = !state.isUpdateProfileSuccess
        state.userInfo = action.payload
      })
      .addCase(updateProfile.rejected, state => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(changePassword.pending, state => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isChangePasswordSuccess = !state.isChangePasswordSuccess
      })
      .addCase(changePassword.rejected, state => {
        state.isLoading = false
        state.isError = true
      })
  }
})

export default userSlice.reducer
