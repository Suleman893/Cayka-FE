//Third party Imports
import { createSlice } from '@reduxjs/toolkit'

//State Import
import { initialState } from './initialState'

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
})

export const { setCurrentPage } = paginationSlice.actions
export default paginationSlice.reducer
