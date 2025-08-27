// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const DevicesProgress = ({ data }) => {
  return (
    <Card className='flex flex-col gap-12'>
      <CardHeader
        title='Last Device Statuses'
        action={
          <CustomTextField
            className='max-sm:is-full sm:is-[140px]'
            select
            fullWidth
            size='small'
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Device Type</MenuItem>
          </CustomTextField>
        }
        className='pbe-0'
      />
      {/* <CardContent className='flex flex-col gap-2 max-md:gap-5 max-[1015px]:gap-[62px] max-[1051px]:gap-10 max-[1200px]:gap-5 max-[1310px]:gap-10'>
       */}
      <CardContent className='flex flex-col'>
        <div className='flex flex-col sm:flex-row gap-4 p-2'>
          {data.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 is-full'>
              <Typography variant='h6' className='leading-6 font-normal'>
                {item.title}
              </Typography>
              <Typography variant='h4'>{item.progress}</Typography>
              <LinearProgress
                value={item.progress}
                variant='determinate'
                color={item.progressColor}
                className='max-bs-1'
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default DevicesProgress
