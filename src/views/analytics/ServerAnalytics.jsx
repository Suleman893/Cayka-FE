'use client'

//React Import
import { useState } from 'react'

//MUI Imports
import Grid from '@mui/material/Grid2'

//Reusable Imports
import BasicStats from '@components/cards/BasicStats'

//Data Import
import { serverBasicStats } from '@data/analytics/analytics'
import TotalServerRequest from '@components/analytics/serverAnalytics/charts/TotalServerRequest'
import ServerRequestByDevices from '@components/analytics/serverAnalytics/charts/ServerRequestByDevices'
import PhoneRequest from '@components/analytics/serverAnalytics/charts/PhoneRequest'
import CountryRequest from '@components/analytics/serverAnalytics/charts/CountryRequest'

const ServerAnalytics = () => {
  const [currentStats, setCurrentStats] = useState('totalServerRequests')

  const component = {
    totalServerRequests: TotalServerRequest,
    serverRequestByDevices: ServerRequestByDevices,
    phoneRequest: PhoneRequest,
    countryRequest: CountryRequest
  }

  const SelectedComponent = component[currentStats] || null

  return (
    <div className='flex flex-col gap-4'>
      <Grid container spacing={6}>
        {serverBasicStats.map((item, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <BasicStats {...item} currentStats={currentStats} setCurrentStats={setCurrentStats} isClickable={true} />
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>{<SelectedComponent />}</Grid>
      </Grid>
    </div>
  )
}

export default ServerAnalytics
