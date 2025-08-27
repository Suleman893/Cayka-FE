//MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

const AssignModule = ({ getValues }) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Typography sx={{ textAlign: 'center' }}>
        Are you Sure you want to assign selected module to
        <span className='font-semibold'> “{getValues('brand.name')}” </span>?
      </Typography>
    </Grid>
  )
}

export default AssignModule
