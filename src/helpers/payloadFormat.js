//Format payload in Add Brands
//******Send null in optional fields to maintain DB structure******
export const addBrandFormat = content => {
  const { data, selectedCountryCode } = content

  return {
    name: data.name,
    notes: data.notes || null,
    serverType: data.serverType,
    user: {
      firstName: data.firstName,
      email: data.email,
      phone: selectedCountryCode + data.phone,
      country: data.country,
      address: data.address
    },
    brandLicense: {
      licenseKey: data.licenseKey,
      startDate: data.startDate,
      endDate: data.endDate
    }
  }
}

//Format payload in Device Assignments
//******Send null in optional fields to maintain DB structure******
export const deviceAssignmentFormat = data => {
  return {
    brandId: data?.brand?.id,
    brandPurchaseOrderId: data?.brandPurchaseOrder?.id,
    devices: data?.devices?.map(device => device.id),
    invoiceId: data?.invoiceId || null
  }
}
