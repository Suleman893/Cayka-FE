//Third party Imports
import { createSlice } from '@reduxjs/toolkit'

//Thunks Imports
import { login, forgotPassword, resetPassword, renewAccessToken } from '@redux/auth/thunk'

//State Import
import { initialState } from './initialState'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOAuth: (state, action) => {
      const { accessToken, refreshToken } = action.payload

      state.userToken = { accessToken, refreshToken }
    },
    logout: (state, action) => {
      state.userToken = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoginLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoginLoading = false
        state.isSuccess = true
        state.userToken = action.payload
      })
      .addCase(login.rejected, state => {
        state.isLoginLoading = false
        state.isError = true
      })
      .addCase(forgotPassword.pending, state => {
        state.isForgotPassLoading = true
      })
      .addCase(forgotPassword.fulfilled, state => {
        state.isForgotPassLoading = false
        state.isSuccess = true
      })
      .addCase(forgotPassword.rejected, state => {
        state.isForgotPassLoading = false
        state.isError = true
      })
      .addCase(resetPassword.pending, state => {
        state.isResetPassLoading = true
      })
      .addCase(resetPassword.fulfilled, state => {
        state.isResetPassLoading = false
        state.isSuccess = true
      })
      .addCase(resetPassword.rejected, state => {
        state.isResetPassLoading = false
        state.isError = true
      })
      .addCase(renewAccessToken.fulfilled, (state, action) => {
        state.userToken.accessToken = action.payload
      })
      .addCase(renewAccessToken.rejected, state => {
        state.userToken = null
      })
  }
})

export const { setOAuth, logout } = authSlice.actions
export default authSlice.reducer
