// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const DashboardActions = ({ title }) => {
  const router = useRouter()

  return (
    <CardContent>
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} display='flex' justifyContent='flex-end'>
          <Button className='max-sm:is-full' variant='contained' onClick={() => router.push('/brands')}>
            View All Brand List
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default DashboardActions
