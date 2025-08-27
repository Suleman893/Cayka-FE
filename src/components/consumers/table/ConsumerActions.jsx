// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const ConsumerActions = ({ title }) => {
  return (
    <CardContent>
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} display='flex' justifyContent='flex-end'>
          <Button
            className='max-sm:is-full'
            variant='tonal'
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

export default ConsumerActions
