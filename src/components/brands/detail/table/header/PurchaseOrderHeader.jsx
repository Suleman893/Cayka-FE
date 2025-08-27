// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import { Typography } from '@mui/material'

//Redux Imports
import { useSelector } from 'react-redux'

const PurchaseOrderHeader = ({ data }) => {
  //Getting brand related details
  const { brandDetail } = useSelector(state => state.brand)

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant='h5'>Brand Name: {brandDetail?.name}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant='h5'>Brand ID: {brandDetail?.id}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant='h5'>Invoice ID: {data?.invoiceId || `-`}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default PurchaseOrderHeader
