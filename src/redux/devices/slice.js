//Third party Imports
import { createSlice } from '@reduxjs/toolkit'

//Thunks Imports
import {
  uploadDevices,
  allAssignedDevices,
  allInventoryDevices,
  allUnassignedDevices,
  assignDevicesToBrand,
  unAssignDevice,
  deleteUnassignDevice,
  deviceDetail,
  changeStatus,
  inventoryExists
} from '@redux/devices/thunk'

//State Import
import { initialState } from './initialState'

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    resetDeviceDetail: (state, action) => {
      state.isDeviceDetailLoading = false
      state.isSuccess = false
      state.deviceDetail = null
      state.isError = false
    }
  },
  extraReducers: builder => {
    builder

      //---------Unassigned Devices---------
      //To conditionally render different views for Unassigned Inventory/Upload Device
      .addCase(inventoryExists.pending, state => {
        state.isInventoryExistsLoading = true
      })
      .addCase(inventoryExists.fulfilled, (state, action) => {
        state.isInventoryExistsLoading = false
        state.isInventoryExists = action.payload
        state.isSuccess = true
      })
      .addCase(inventoryExists.rejected, state => {
        state.isInventoryExistsLoading = false
        state.isError = true
      })

      .addCase(uploadDevices.pending, state => {
        state.isUploadDevicesLoading = true
      })
      .addCase(uploadDevices.fulfilled, (state, action) => {
        state.isUploadDevicesLoading = false
        state.isListingUpdateSuccess = !state.isListingUpdateSuccess
      })
      .addCase(uploadDevices.rejected, state => {
        state.isUploadDevicesLoading = false
        state.isError = true
      })

      //For table listing, usage in Unassigned Devices Page Table
      .addCase(allInventoryDevices.pending, state => {
        state.isInventoryLoading = true
      })
      .addCase(allInventoryDevices.fulfilled, (state, action) => {
        state.isInventoryLoading = false
        state.inventory = action.payload
        state.isSuccess = true
      })
      .addCase(allInventoryDevices.rejected, state => {
        state.isInventoryLoading = false
        state.isError = true
      })

      // For dropdown, usage in Device Assignment Modal in Unassigned Devices Page Table
      .addCase(allUnassignedDevices.pending, state => {
        state.isUnassignedDevicesLoading = true
      })
      .addCase(allUnassignedDevices.fulfilled, (state, action) => {
        state.isUnassignedDevicesLoading = false
        state.unassignedDevices = action.payload
      })
      .addCase(allUnassignedDevices.rejected, state => {
        state.isUnassignedDevicesLoading = false
        state.isError = true
      })

      //Device Assignment to a Brand
      .addCase(assignDevicesToBrand.pending, state => {
        state.isAssignDeviceLoading = true
      })
      .addCase(assignDevicesToBrand.fulfilled, (state, action) => {
        state.isAssignDeviceLoading = false
        state.isListingUpdateSuccess = !state.isListingUpdateSuccess
      })
      .addCase(assignDevicesToBrand.rejected, state => {
        state.isAssignDeviceLoading = false
        state.isError = true
      })

      //Delete the assigned device in the UnAssigned Devices Listings
      .addCase(deleteUnassignDevice.pending, state => {
        state.isDeleteDeviceLoading = true
      })
      .addCase(deleteUnassignDevice.fulfilled, (state, action) => {
        state.isDeleteDeviceLoading = false
        state.isListingUpdateSuccess = !state.isListingUpdateSuccess
      })
      .addCase(deleteUnassignDevice.rejected, state => {
        state.isDeleteDeviceLoading = false
        state.isError = true
      })

      //--------------Assigned Device-------------
      .addCase(allAssignedDevices.pending, state => {
        state.isAssignedDevicesLoading = true
      })
      .addCase(allAssignedDevices.fulfilled, (state, action) => {
        state.isAssignedDevicesLoading = false
        state.assignedDevices = action.payload
        state.isSuccess = true
      })
      .addCase(allAssignedDevices.rejected, state => {
        state.isAssignedDevicesLoading = false
        state.isError = true
      })

      //Unassign the device in the Assigned Devices Listings
      .addCase(unAssignDevice.pending, state => {
        state.isUnassignDeviceLoading = true
      })
      .addCase(unAssignDevice.fulfilled, (state, action) => {
        state.isUnassignDeviceLoading = false
        state.isUnassignDeviceSuccess = !state.isUnassignDeviceSuccess
      })
      .addCase(unAssignDevice.rejected, state => {
        state.isUnassignDeviceLoading = false
        state.isError = true
      })
      .addCase(deviceDetail.pending, state => {
        state.isDeviceDetailLoading = true
      })
      .addCase(deviceDetail.fulfilled, (state, action) => {
        state.isDeviceDetailLoading = false
        state.deviceDetail = action.payload
        state.isSuccess = true
      })
      .addCase(deviceDetail.rejected, state => {
        state.isDeviceDetailLoading = false
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
  }
})

export const { resetDeviceDetail } = deviceSlice.actions
export default deviceSlice.reducer
