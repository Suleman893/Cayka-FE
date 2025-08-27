// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

const DeviceTriggerAction = ({ title }) => {
  return (
    <CardContent>
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default DeviceTriggerAction
