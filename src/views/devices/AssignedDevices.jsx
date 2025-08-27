'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Static Data Import
import { deviceStats } from '@data/devices/devices'

//Reusable Components
import BasicStats from '@components/cards/BasicStats'

//Icon Imports
import AssignedDevicesTable from '@components/devices/table/AssignedTable'

const AssignedDevices = () => {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <Grid container spacing={6}>
          {deviceStats.map((item, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <BasicStats {...item} />
            </Grid>
          ))}
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AssignedDevicesTable />
        </Grid>
      </div>
    </>
  )
}

export default AssignedDevices
