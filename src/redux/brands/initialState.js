export const initialState = {
  //Common
  isLoading: false,
  isSuccess: false,
  isError: false,

  //Brand Listings
  isBrandLoading: false,
  brands: null,

  //Brand Detail
  brandDetail: null,
  isBrandDetailLoading: false,

  //Change Status of Brand
  isStatusChangeLoading: false,
  isStatusChangeSuccess: false,

  //Add Brand
  isAddBrandLoading: false,
  isAddBrandSuccess: false,

  //Add Invoice
  isAddInvoiceLoading: false,
  isAddInvoiceSuccess: false,

  //Purchase Order List
  purchaseOrders: null,
  isPOLoading: false,

  //Purchase Order CRUD
  isAddPOLoading: false,
  isAddPOSuccess: false,
  isDeletePOLoading: false,
  isDeletePOSuccess: false,

  //Purchase Order Devices in modal
  isPODevicesLoading: false,
  PODevices: null,

  //Brand Admin's Listings
  isBrandAdminLoading: false,
  brandAdmins: null
}
