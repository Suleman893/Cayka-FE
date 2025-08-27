//React States
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Third Party Import
import { useSelector } from 'react-redux'

//Custom Components Imports
import BasicInfo from '@components/cards/BasicInfo'
import TriggerInsights from '@components/consumers/cards/TriggerInsights'

//Utils Import
import { deviceNameFormatter } from '@helpers/enumFormat'
import { formatTimestampToDate, snakeToPascalConverter } from '@utils/common'

const DeviceBasicInfo = () => {
  const { deviceDetail } = useSelector(state => state.device)

  //States
  const [deviceInfo, setDeviceInfo] = useState([])
  const [brandInfo, setBrandInfo] = useState([])
  const [firmwareInfo, setFirmwareInfo] = useState([])

  useEffect(() => {
    setDeviceInfo([
      {
        title: 'Device Name',
        value: deviceNameFormatter(deviceDetail?.deviceType?.name)
      },
      {
        title: 'Device ID',
        value: deviceDetail?.deviceId
      },
      {
        title: 'Device Type ID',
        value: deviceDetail?.deviceType?.id
      },
      {
        title: 'Device Status',
        value: snakeToPascalConverter(deviceDetail?.status)
      },
      {
        title: 'Device Associated With',
        value: deviceDetail?.brand?.name
      },
      {
        title: 'Added Date',
        value: formatTimestampToDate(deviceDetail?.createdAt)
      }
    ])

    setBrandInfo([
      {
        title: 'Name',
        value: deviceDetail?.brand?.name
      },
      {
        title: 'Address',
        value: deviceDetail?.brand?.user?.address
      },
      {
        title: 'Country',
        value: deviceDetail?.brand?.user?.country
      },
      {
        title: 'Mobile Number',
        value: deviceDetail?.brand?.user?.phone
      },
      {
        title: 'Consumers',
        value: deviceDetail?.brand?.brandConsumerCount || 0
      },
      {
        title: `Total Device Associated with ${deviceDetail?.brand?.name}`,
        value: deviceDetail?.brand?.totalDeviceCount || 0
      },
      {
        title: 'Brand Status',
        value: snakeToPascalConverter(deviceDetail?.brand?.status)
      }
    ])

    setFirmwareInfo([
      {
        title: 'Version',
        value: 'Unknown'
      },
      {
        title: 'New Update',
        value: 'Unknown'
      },
      {
        title: 'Status',
        value: 'Unknown'
      }
    ])
  }, [deviceDetail?.id])

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <BasicInfo title='Device Overview' data={deviceInfo} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <BasicInfo title='Brand Information' data={brandInfo} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <BasicInfo title='Firmware Version' data={firmwareInfo} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TriggerInsights value='0' />
      </Grid>
    </Grid>
  )
}

export default DeviceBasicInfo
