// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { Avatar } from '@mui/material'

//Utils and Helpers
import { getFullName } from '@utils/common'
import { consumerStatusCheck, consumerStatusColor } from '@helpers/common'

const UserDetails = ({ consumerDetail }) => {
  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center flex-col gap-4'>
              <div className='flex flex-col items-center gap-4'>
                <Avatar
                  src={consumerDetail?.photo}
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: '2.5rem'
                  }}
                >
                  {!consumerDetail?.photo &&
                    `${consumerDetail?.firstName?.charAt(0)}${consumerDetail?.lastName?.charAt(0)}`}
                </Avatar>
                <Typography variant='h5'>{getFullName(consumerDetail?.firstName, consumerDetail?.lastName)}</Typography>
              </div>
              <Chip
                label={consumerStatusCheck(consumerDetail?.isVerified)}
                color={consumerStatusColor(consumerDetail?.isVerified)}
                size='medium'
                variant='contained'
                sx={{ padding: '1px 10px' }}
              />
            </div>
          </div>
          <div>
            <Typography variant='h5'>Details</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Consumer Name:
                </Typography>
                <Typography>{getFullName(consumerDetail?.firstName, consumerDetail?.lastName)}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Email Address:
                </Typography>
                <Typography>{consumerDetail?.email}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Mobile No:
                </Typography>
                <Typography>{consumerDetail?.phone}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Brand Associated:
                </Typography>
                <Typography>{consumerDetail?.brandUser[0]?.brand?.name}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Total Devices:
                </Typography>
                <Typography>{consumerDetail?.totalDevices || 0}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Address:
                </Typography>
                <Typography>{consumerDetail?.address || '-'}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Country:
                </Typography>
                <Typography>{consumerDetail?.country || '-'}</Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UserDetails
