// React Imports
import { useState } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const CountryFilter = () => {
  const [status, setStatus] = useState('')

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
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
            <MenuItem value=''>Select By Country</MenuItem>
            <MenuItem value='US'>US</MenuItem>
            <MenuItem value='Pakistan'>Pakistan</MenuItem>
            <MenuItem value='Turkey'>Turkey</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default CountryFilter
