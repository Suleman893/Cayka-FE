//React Imports
import { useState, useEffect } from 'react'

//Component Imports
import StatusChange from '@components/cards/StatusChange'
import BasicInfo from '@components/cards/BasicInfo'

//Utils and Helpers
import { deviceNameFormatter } from '@helpers/enumFormat'
import { capitalizeFirstLetter, formatTimestampToDate } from '@utils/common'

const LeftSection = ({ data }) => {
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false)
  const [deviceBasicInfo, setDeviceBasicInfo] = useState([])

  useEffect(() => {
    setDeviceBasicInfo([
      {
        title: 'Device Name',
        value: deviceNameFormatter(data?.device?.name)
      },
      {
        title: 'Device ID',
        value: data?.device?.deviceId
      },
      {
        title: 'Device Type Id',
        value: data?.device?.deviceType?.id
      },
      {
        title: 'Device Status',
        value: capitalizeFirstLetter(data?.device?.status)
      },
      {
        title: 'Device Associated With',
        value: data?.device?.brand?.name
      },
      {
        title: 'Added Date',
        value: formatTimestampToDate(data?.device?.createdAt)
      }
    ])
  }, [data.id])

  return (
    <div className='flex flex-col gap-4'>
      <StatusChange
        title='Change Device Status'
        switchTitle='Online/Offline'
        openChangeStatusModal={openChangeStatusModal}
        setOpenChangeStatusModal={setOpenChangeStatusModal}
      />
      <BasicInfo title='Device Overview' data={deviceBasicInfo} />
    </div>
  )
}

export default LeftSection
