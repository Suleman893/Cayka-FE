// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const BasicInfo = ({ title, data }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <Typography variant='h5'>{title}</Typography>
          <Divider />
          <div className='flex flex-col gap-2'>
            {data.map((item, index) => (
              <div className='flex items-center gap-1' key={index}>
                <Typography color='text.primary' className='font-medium'>
                  {item.title}:
                </Typography>
                <Typography>{item.value}</Typography>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BasicInfo
