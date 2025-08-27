// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Redux Import
import { useSelector } from 'react-redux'

//Static Data
import { consumerActivity } from '@data/consumers/consumers'

// Components Imports
import StatusChange from '@components/cards/StatusChange'
import ActivityLogs from '@components/cards/ActivityLogs'
import ChangeStatus from '@components/consumers/detail/dialogs/ChangeStatus'
import DeviceListTable from '@components/consumers/detail/table/DeviceListTable'
import BasicDialog from '@core/components/mui/BasicDialog'

const RightOverView = () => {
  const { consumerDetail } = useSelector(state => state.consumer)

  //States
  //Switch
  const [isChecked, setIsChecked] = useState(false)

  //Modal
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false)

  useEffect(() => {
    setIsChecked(consumerDetail?.isVerified || false)
  }, [consumerDetail?.isVerified])

  return (
    <>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <StatusChange
            title='Change Consumer Status'
            switchTitle='Activate/Inactive'
            defaultChecked={consumerDetail?.isVerified || false}
            checked={isChecked}
            handleChange={() => {
              setIsChecked(!isChecked)
              setOpenChangeStatusModal(!openChangeStatusModal)
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ActivityLogs title='Consumer Activity Log' data={consumerActivity} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <DeviceListTable />
        </Grid>
      </Grid>
      <BasicDialog
        fullWidth={false}
        title='Confirmation!'
        subTitle=''
        content={<ChangeStatus data={consumerDetail} setIsChecked={setIsChecked} setOpen={setOpenChangeStatusModal} />}
        open={openChangeStatusModal}
        setOpen={setOpenChangeStatusModal}
      />
    </>
  )
}

export default RightOverView
