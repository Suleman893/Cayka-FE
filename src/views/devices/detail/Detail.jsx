'use client'

//React Hooks Imports
import { useEffect } from 'react'

//Next Imports
import { useParams } from 'next/navigation'

//React Redux Imports
import { useDispatch, useSelector } from 'react-redux'

//MUI Imports
import Grid from '@mui/material/Grid2'

//Component Import
import BreadCrumb from '@components/commons/Breadcrumb'
import DeviceBasicInfo from '@components/devices/detail/DeviceBasicInfo'
import DeviceActivity from '@components/devices/detail/DeviceActivity'

//Redux Imports
import { deviceDetail } from '@redux/devices/thunk'
import { resetDeviceDetail } from '@redux/devices/slice'

const Detail = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { isStatusChangeSuccess } = useSelector(state => state.device)

  useEffect(() => {
    dispatch(deviceDetail({ id }))

    return () => {
      dispatch(resetDeviceDetail())
    }
  }, [isStatusChangeSuccess])

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <BreadCrumb title='Device Details' />
      </Grid>

      {/* Left section */}
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <DeviceBasicInfo />
      </Grid>

      {/* Right section */}
      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <DeviceActivity />
      </Grid>
    </Grid>
  )
}

export default Detail
