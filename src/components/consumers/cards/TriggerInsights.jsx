// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'

//Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TriggerInsights = ({ value }) => {
  return (
    <Card className='flex flex-col gap-2'>
      <CardHeader
        title='Triggers Insights'
        action={
          <CustomTextField
            className='max-sm:is-full sm:is-[110px]'
            select
            id='select-status'
            fullWidth
            size='small'
            value={status}
            onChange={e => setStatus(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>TODAY</MenuItem>
          </CustomTextField>
        }
      />

      <CardContent>
        <Typography variant='h5'>{value}</Typography>
      </CardContent>
    </Card>
  )
}

export default TriggerInsights
