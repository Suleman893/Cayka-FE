//MUI Imports
import Grid from '@mui/material/Grid2'

//Reusable Components
import ChangePassword from '@components/profile/ChangePassword'
import RecentDevices from '@components/profile/RecentDevices'

const Security = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ChangePassword />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <RecentDevices />
      </Grid>
    </Grid>
  )
}

export default Security
