//Third party Imports
import { createSlice } from '@reduxjs/toolkit'

//Thunks Imports
import {
  allBrands,
  addBrand,
  brandDetail,
  changeStatus,
  allPurchaseOrders,
  deletePurchaseOrder,
  addPurchaseOrder,
  addInvoice,
  allPODevices,
  allBrandAdmins
} from '@redux/brands/thunk'

//State Import
import { initialState } from './initialState'

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    resetBrandDetail: (state, action) => {
      state.isBrandDetailLoading = false
      state.isSuccess = false
      state.brandDetail = null
      state.isError = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addBrand.pending, state => {
        state.isAddBrandLoading = true
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.isAddBrandLoading = false
        state.isAddBrandSuccess = !state.isAddBrandSuccess
      })
      .addCase(addBrand.rejected, state => {
        state.isAddBrandLoading = false
        state.isError = true
      })
      .addCase(allBrands.pending, state => {
        state.isBrandLoading = true
      })
      .addCase(allBrands.fulfilled, (state, action) => {
        state.isBrandLoading = false
        state.isSuccess = true
        state.brands = action.payload
      })
      .addCase(allBrands.rejected, state => {
        state.isBrandLoading = false
        state.isError = true
      })
      .addCase(brandDetail.pending, state => {
        state.isBrandDetailLoading = true
      })
      .addCase(brandDetail.fulfilled, (state, action) => {
        state.isBrandDetailLoading = false
        state.isSuccess = true
        state.brandDetail = action.payload
      })
      .addCase(brandDetail.rejected, state => {
        state.isBrandDetailLoading = false
        state.isError = true
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
      .addCase(addPurchaseOrder.pending, state => {
        state.isAddPOLoading = true
      })
      .addCase(addPurchaseOrder.fulfilled, (state, action) => {
        state.isAddPOLoading = false
        state.isAddPOSuccess = !state.isAddPOSuccess
        state.purchaseOrders = action.payload
      })
      .addCase(addPurchaseOrder.rejected, state => {
        state.isAddPOLoading = false
        state.isError = true
      })
      .addCase(allPurchaseOrders.pending, state => {
        state.isPOLoading = true
      })
      .addCase(allPurchaseOrders.fulfilled, (state, action) => {
        state.isPOLoading = false
        state.isSuccess = true
        state.purchaseOrders = action.payload
      })
      .addCase(allPurchaseOrders.rejected, state => {
        state.isPOLoading = false
        state.isError = true
      })
      .addCase(deletePurchaseOrder.pending, state => {
        state.isDeletePOLoading = true
      })
      .addCase(deletePurchaseOrder.fulfilled, (state, action) => {
        state.isDeletePOLoading = false
        state.isDeletePOSuccess = !state.isDeletePOSuccess
      })
      .addCase(deletePurchaseOrder.rejected, state => {
        state.isDeletePOLoading = false
        state.isError = true
      })
      .addCase(addInvoice.pending, state => {
        state.isAddInvoiceLoading = true
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.isAddInvoiceLoading = false
        state.isAddInvoiceSuccess = !state.isAddInvoiceSuccess
      })
      .addCase(addInvoice.rejected, state => {
        state.isAddInvoiceLoading = false
        state.isError = true
      })
      .addCase(allPODevices.pending, state => {
        state.isPODevicesLoading = true
      })
      .addCase(allPODevices.fulfilled, (state, action) => {
        state.isPODevicesLoading = false
        state.isSuccess = true
        state.PODevices = action.payload
      })
      .addCase(allPODevices.rejected, state => {
        state.isPODevicesLoading = false
        state.isError = false
      })
      .addCase(allBrandAdmins.pending, state => {
        state.isBrandAdminLoading = true
      })
      .addCase(allBrandAdmins.fulfilled, (state, action) => {
        state.isBrandAdminLoading = false
        state.isSuccess = true
        state.brandAdmins = action.payload
      })
      .addCase(allBrandAdmins.rejected, state => {
        state.isBrandAdminLoading = false
        state.isError = true
      })
  }
})

export const { resetBrandDetail } = brandSlice.actions
export default brandSlice.reducer
