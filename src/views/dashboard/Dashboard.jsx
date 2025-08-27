'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Reusable Components
import Intro from '@components/dashboard/Intro'
import AddBrandDialog from '@components/brands/dialogs/AddNewBrand'
import DevicesProgress from '@components/dashboard/DevicesProgress'
import TodayTriggerInsights from '@components/cards/TodayTriggerInsights'
import DashboardTable from '@components/dashboard/table/DashboardTable'
import BasicMetrics from '@components/dashboard/BasicMetrics'

//Static Data Imports
import { linearProgressData } from '@data/dashboard/dashboard'

const Dashboard = () => {
  //States
  const [openAddBrand, setOpenAddBrand] = useState(false)

  return (
    <>
      {openAddBrand && <AddBrandDialog open={openAddBrand} setOpen={setOpenAddBrand} title='Add Brands' />}
      <div className='flex flex-col gap-4'>
        <Intro setOpen={setOpenAddBrand} />
        <BasicMetrics />
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4.5 }}>
            <TodayTriggerInsights value='0' percentage='0' />
          </Grid>
          <Grid size={{ xs: 12, md: 7.5 }}>
            <DevicesProgress data={linearProgressData} />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <DashboardTable />
        </Grid>
      </div>
    </>
  )
}

export default Dashboard
