//Auth Module
const loginDefault = {
  email: '',
  password: ''
}

//Brands Module
const addNewBrandDefault = {
  name: '',
  address: '',
  country: '',
  firstName: '',
  email: '',
  phone: '',
  notes: '',
  serverType: '',
  startDate: null,
  endDate: null,
  licenseKey: ''
}

//Invoice Id
const addInvoiceDefault = {
  invoiceId: ''
}

//License Module
const renewLicenseDefault = {
  status: 'active',
  endDate: null
}

const revokeLicenseDefault = {
  status: 'inactive'
}

//Device Module
const assignDeviceDefault = {
  brand: null,
  brandPurchaseOrder: null,
  devices: [],
  invoiceId: ''
}

export {
  loginDefault,
  addNewBrandDefault,
  addInvoiceDefault,
  renewLicenseDefault,
  revokeLicenseDefault,
  assignDeviceDefault
}
