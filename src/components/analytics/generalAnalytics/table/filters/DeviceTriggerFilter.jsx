// React Imports
import { useState } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TotalTriggerFilters = () => {
  const [status, setStatus] = useState('')

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            slotProps={{
              select: { displayEmpty: true }
            }}
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <MenuItem value=''>Select By Device Type</MenuItem>
            <MenuItem value='SingleSmartAdapter'>Single Smart Adapter</MenuItem>
            <MenuItem value='SingleWallSwitch'>Single Wall Switch</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            slotProps={{
              select: { displayEmpty: true }
            }}
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <MenuItem value=''>Select By Device Id</MenuItem>
            <MenuItem value='BrandOne'>516-11216-15</MenuItem>
            <MenuItem value='BrandTwo'>516-11122-12</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TotalTriggerFilters
