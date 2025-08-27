// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import { brandStatusOptions } from '@data/brands/brands'
import countries from '@data/common/countries'

const BrandFilters = ({ setPage, setFilters }) => {
  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomAutocomplete
            disableClearable={false}
            fullWidth
            id='select-brand-status'
            options={brandStatusOptions}
            onChange={(_, value) => {
              setFilters(prev => ({ ...prev, brandStatus: value?.value || null }))
              setPage(1)
            }}
            renderInput={params => <CustomTextField {...params} placeholder='Select Status' />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomAutocomplete
            disableClearable={false}
            fullWidth
            id='select-country'
            options={countries}
            getOptionLabel={option => option.name}
            onChange={(_, value) => {
              setFilters(prev => ({ ...prev, brandCountry: value?.name || null }))
              setPage(1)
            }}
            renderInput={params => <CustomTextField {...params} placeholder='Select Country' />}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default BrandFilters
