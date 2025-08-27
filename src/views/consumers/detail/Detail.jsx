'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import BreadCrumb from '@components/commons/Breadcrumb'
import LeftOverview from '@components/consumers/detail/LeftOverView'
import RightOverView from '@components/consumers/detail/RightOverview'

const Detail = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <BreadCrumb title='Consumer Details' />
        </Grid>

        {/* Left section */}
        <Grid size={{ xs: 12, lg: 4, md: 5 }}>
          <LeftOverview />
        </Grid>

        {/* Right Section */}
        <Grid size={{ xs: 12, lg: 8, md: 7 }}>
          <RightOverView />
        </Grid>
      </Grid>
    </>
  )
}

export default Detail
