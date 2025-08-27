export const initialState = {
  //Common
  isLoading: false,
  isSuccess: false,
  isError: false,

  //Check if inventory exist to display different screens (UploadDevices/Unassigned)
  isInventoryExistsLoading: false,
  isInventoryExists: false,

  // isListingUpdateSuccess state tracks updates to unassigned listings.
  // Triggers re-render on changes such as device file uploads,
  // unassigned device deletions, or device assignments to a brand.
  isListingUpdateSuccess: false,

  //Upload Devices
  isUploadDevicesLoading: false,

  //Assigned Listings
  assignedDevices: null,
  isAssignedDevicesLoading: false,

  //Unassigned Listings (For Table/Listing)
  //For table listing, usage in Unassigned Devices Page Table
  inventory: null,
  isInventoryLoading: false,

  //Unassigned Devices (For Dropdown)
  // For dropdown, usage in Device Assignment Modal in Unassigned Devices Page Table
  unassignedDevices: null,
  isUnassignedDevicesLoading: false,

  //Assign devices to brand
  isAssignDeviceLoading: false,

  //Delete Unassign Device
  isDeleteDeviceLoading: false,

  //Unassign the Device in Assigned Device Listings
  isUnassignDeviceLoading: false,
  isUnassignDeviceSuccess: true,

  //Detail Detail
  deviceDetail: null,
  isDeviceDetailLoading: false,

  //Change Status of Device
  isStatusChangeLoading: false,
  isStatusChangeSuccess: false
}
