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
        title='Device Statistics'
        action={
          <CustomTextField
            className='max-sm:is-full sm:is-[190px]'
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
            <MenuItem value=''>Select Device Type</MenuItem>
          </CustomTextField>
        }
        className='pbe-0'
      />
      {/* <CardContent className='flex flex-col gap-2 max-md:gap-5 max-[1015px]:gap-[62px] max-[1051px]:gap-10 max-[1200px]:gap-5 max-[1310px]:gap-10'>
       */}
      <CardContent className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <Typography variant='h5'>Total Purchased Devices</Typography>
          <Typography variant='h4'>25</Typography>
        </div>
        <div
          className='
        border border-[#2F2B3D1F] rounded-md
        flex flex-col sm:flex-row gap-4 p-4'
        >
          {data.map((item, index) => (
            <div
              key={index}
              className='flex flex-col gap-4 is-full 
            p-2
            '
            >
              <div className='flex items-center gap-2'>
                {item.icon}
                <Typography variant='h6' className='leading-6 font-normal'>
                  {item.title}
                </Typography>
              </div>
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
