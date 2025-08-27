// MUI Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const LicenseManagementActions = ({ title }) => {
  return (
    <CardContent>
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} display='flex' justifyContent='flex-end'>
          <Button
            variant='tonal'
            className='max-sm:is-full'
            color='secondary'
            startIcon={<i className='tabler-upload' />}
          >
            Export
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default LicenseManagementActions
