// React Imports
import { useEffect } from 'react'

//Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Third-Party Imports
import { createColumnHelper } from '@tanstack/react-table'
import { useSelector, useDispatch } from 'react-redux'

//Reusable Components Imports
import UserDetails from '@components/cards/UserDetails'
import TriggerInsights from '@components/consumers/cards/TriggerInsights'
import BrandDeviceTable from '@components/consumers/detail/table/BrandDeviceTable'

//Redux Imports
import { consumerDetails } from '@redux/consumers/thunk'

const LeftOverview = () => {
  const { consumerDetail, isStatusChangeSuccess } = useSelector(state => state.consumer)

  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(consumerDetails({ id }))
  }, [isStatusChangeSuccess])

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <UserDetails consumerDetail={consumerDetail} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TriggerInsights value='0' />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <BrandDeviceTable consumerDetail={consumerDetail} />
      </Grid>
    </Grid>
  )
}

export default LeftOverview
