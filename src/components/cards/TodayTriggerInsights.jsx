// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'

//Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'

//Icon Imports
import TodayInsights from '@assets/svg/TodayInsight'

const TodayTriggerInsights = ({ value, percentage }) => {
  return (
    <Card className='flex flex-col gap-4'>
      <CardHeader
        title='Trigger Insights'
        action={
          <CustomTextField
            className='max-sm:is-full sm:is-[140px]'
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
            <MenuItem value=''>Device Type</MenuItem>
          </CustomTextField>
        }
      />

      <CardContent className='flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <CustomAvatar color='primary' skin='light-static' variant='rounded' size={42}>
            <TodayInsights />
          </CustomAvatar>
          <Typography variant='h5'>{value}</Typography>
        </div>

        <Typography variant='body1'>Today&apos;s Insights</Typography>
        <div className='flex items-center gap-2'>
          <Typography variant='h5'>{percentage}%</Typography>
          <Typography variant='body2'>than last week</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default TodayTriggerInsights
