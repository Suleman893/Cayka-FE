//Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Component Imports
import TabComp from '@core/components/mui/TabComp'
import UserProfileHeader from '@components/profile/UserProfileHeader'

//Data Import
import { tabsOption } from '@data/user/user'

//Component Imports
const Overview = dynamic(() => import('@views/profile/Overview'))
const Security = dynamic(() => import('@views/profile/Security'))

const Profile = () => {
  const tabContentList = () => ({
    overview: <Overview />,
    security: <Security />
  })

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <UserProfileHeader />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TabComp initialActiveTab='overview' tabContentList={tabContentList()} tabsOption={tabsOption} />
      </Grid>
    </Grid>
  )
}

export default Profile
