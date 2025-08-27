'use client'

//React Import
import { useState } from 'react'

//MUI Imports
import Grid from '@mui/material/Grid2'

//Data Import
import { generalBasicStats } from '@data/analytics/analytics'

//Reusable Components
import BasicStats from '@components/cards/BasicStats'

//Tables Component
import DeviceTable from '@components/analytics/generalAnalytics/table/tables/DeviceTable'
import ActiveDevicesTable from '@components/analytics/generalAnalytics/table/tables/ActiveDevicesTable'
import InActiveDevicesTable from '@components/analytics/generalAnalytics/table/tables/InActiveDevicesTable'
import DeviceTriggerTable from '@components/analytics/generalAnalytics/table/tables/DeviceTriggerTable'
import ConsumerTable from '@components/analytics/generalAnalytics/table/tables/ConsumerTable'
import BrandsTable from '@components/analytics/generalAnalytics/table/tables/BrandsTable'
import DeviceTypeTable from '@components/analytics/generalAnalytics/table/tables/DeviceTypeTable'
import CountriesTable from '@components/analytics/generalAnalytics/table/tables/CountriesTable'

const GeneralAnalytics = () => {
  const [currentStats, setCurrentStats] = useState('devices')

  const component = {
    devices: DeviceTable,
    activeDevices: ActiveDevicesTable,
    inActiveDevices: InActiveDevicesTable,
    devicesTrigger: DeviceTriggerTable,
    consumers: ConsumerTable,
    brands: BrandsTable,
    devicesType: DeviceTypeTable,
    countries: CountriesTable
  }

  const SelectedComponent = component[currentStats] || null

  return (
    <div className='flex flex-col gap-4'>
      <Grid container spacing={6}>
        {generalBasicStats.map((item, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <BasicStats {...item} currentStats={currentStats} setCurrentStats={setCurrentStats} isClickable={true} />
          </Grid>
        ))}
      </Grid>
      <Grid size={{ xs: 12 }}>{<SelectedComponent />}</Grid>
    </div>
  )
}

export default GeneralAnalytics
