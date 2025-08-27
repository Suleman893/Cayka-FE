//React States
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Third Party Import
import { useSelector } from 'react-redux'

//Custom Components Imports
import BasicInfo from '@components/cards/BasicInfo'

//Utils Import
import { formatTimestampToDate, getFullName, snakeToPascalConverter } from '@utils/common'

const BrandBasicInfo = () => {
  const { brandDetail } = useSelector(state => state.brand)

  //States
  const [brandInfo, setBrandInfo] = useState([])
  const [brandAdminInfo, setBrandAdminInfo] = useState([])
  const [licenseKeyInfo, setLicenseKeyInfo] = useState([])

  useEffect(() => {
    setBrandInfo([
      {
        title: 'Name',
        value: brandDetail?.name
      },
      {
        title: 'Country',
        value: brandDetail?.user?.country
      },
      {
        title: 'Status',
        value: snakeToPascalConverter(brandDetail?.status)
      }
    ])

    setBrandAdminInfo([
      {
        title: 'Name',
        value: getFullName(brandDetail?.user?.firstName, brandDetail?.user?.lastName)
      },
      {
        title: 'Email',
        value: brandDetail?.user?.email
      },
      {
        title: 'Address',
        value: brandDetail?.user?.address
      },
      {
        title: 'Status',
        value: snakeToPascalConverter(brandDetail?.status)
      }
    ])

    setLicenseKeyInfo([
      {
        title: 'License Key',
        value: brandDetail?.brandLicense?.licenseKey
      },
      {
        title: 'License Status',
        value: snakeToPascalConverter(brandDetail?.brandLicense?.status)
      },
      {
        title: 'License Start Date',
        value: formatTimestampToDate(brandDetail?.brandLicense?.startDate)
      },
      {
        title: 'License Expiry Date',
        value: formatTimestampToDate(brandDetail?.brandLicense?.endDate)
      }
    ])
  }, [brandDetail?.id])

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <BasicInfo title={`Brand's Information`} data={brandInfo} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <BasicInfo title={`Brand Admin's Information`} data={brandAdminInfo} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <BasicInfo title='License Details' data={licenseKeyInfo} />
      </Grid>
    </Grid>
  )
}

export default BrandBasicInfo
