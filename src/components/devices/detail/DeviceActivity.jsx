// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Third Party Imports
import { useSelector } from 'react-redux'

//Reusable Components Imports
import BasicDialog from '@core/components/mui/BasicDialog'
import StatusChange from '@components/cards/StatusChange'
import ChangeStatus from '@components/devices/detail/dialogs/ChangeStatus'
import ActivityLogs from '@components/cards/ActivityLogs'

//Data Import
import { deviceActivityLogs } from '@data/devices/devices'

const DeviceActivity = () => {
  const { deviceDetail } = useSelector(state => state.device)

  //States
  //Switch
  const [isChecked, setIsChecked] = useState(false)

  //Modal
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false)

  useEffect(() => {
    setIsChecked(deviceDetail?.status === 'online' ? true : false)
  }, [deviceDetail?.status])

  return (
    <>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <StatusChange
            title='Change Device Status'
            switchTitle='Online/Offline'
            defaultChecked={deviceDetail?.status === 'online' ? true : false}
            checked={isChecked}
            handleChange={() => {
              setIsChecked(!isChecked)
              setOpenChangeStatusModal(!openChangeStatusModal)
            }}
            data={deviceDetail}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ActivityLogs title='Device Activity Log' data={deviceActivityLogs} />
        </Grid>
      </Grid>
      <BasicDialog
        fullWidth={false}
        title='Confirmation!'
        subTitle=''
        content={<ChangeStatus setIsChecked={setIsChecked} setOpen={setOpenChangeStatusModal} />}
        open={openChangeStatusModal}
        setOpen={setOpenChangeStatusModal}
      />
    </>
  )
}

export default DeviceActivity
