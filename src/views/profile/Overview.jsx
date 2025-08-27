//MUI Imports
import Grid from '@mui/material/Grid2'

//Reusable Components
import ActivityLogs from '@components/cards/ActivityLogs'

//Static Data Imports
import { consumerActivity } from '@data/consumers/consumers'

const Overview = () => {
  return (
    <Grid size={{ xs: 12 }}>
      <ActivityLogs title='Admin Activity Log' data={consumerActivity} isBtn={true} btnTitle='View All' />
    </Grid>
  )
}

export default Overview
