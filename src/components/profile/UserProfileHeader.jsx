'use client'

//React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'

//React redux Imports
import { useSelector } from 'react-redux'

//Component Imports
import BasicDialog from '@core/components/mui/BasicDialog'
import EditProfile from '@components/profile/dialog/EditProfile'

//Utils Import
import { snakeToPascalConverter, getFullName } from '@utils/common'

const UserProfileHeader = () => {
  //Redux
  const { userInfo } = useSelector(state => state.user)

  //States
  const [openEditDetail, setOpenEditDetail] = useState(false)

  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-6'>
          <div className='flex flex-wrap justify-between items-start gap-4 max-sm:flex-col w-full'>
            <div className='flex gap-6 max-md:flex-col '>
              <Avatar
                variant='square'
                alt={userInfo?.firstName}
                src={userInfo?.photo || userInfo?.firstName}
                sx={{ width: '30%', height: '110px' }}
              />
              {/* <img
                height={100}
                width={100}
                className='rounded'
                src={userInfo?.photo || '/images/commons/UserOne.png'}
                alt='Profile'
              /> */}
              <div className='flex flex-grow flex-col gap-4'>
                <Typography variant='h5'>{getFullName(userInfo?.firstName, userInfo?.lastName)}</Typography>
                <div className='flex gap-2'>
                  <Typography variant='h6'>Email:</Typography>
                  <Typography>{userInfo?.email}</Typography>
                </div>
                <Chip
                  variant='tonal'
                  label={snakeToPascalConverter(userInfo?.role?.name)}
                  color='gray'
                  size='small'
                  className='mbe-1 w-[40%]'
                />
              </div>
            </div>
            <Button variant='contained' onClick={() => setOpenEditDetail(true)}>
              Edit Details
            </Button>
          </div>
          <Divider />
          <div className='flex gap-4 max-md:flex-col'>
            {' '}
            <div className='flex gap-2'>
              <Typography variant='h6'>Email:</Typography>
              <Typography>{userInfo?.email}</Typography>
            </div>
            <div className='flex gap-2'>
              <Typography variant='h6'>Status:</Typography>
              <Typography>Active</Typography>
            </div>
            <div className='flex gap-2'>
              <Typography variant='h6'>Contact:</Typography>
              <Typography>{userInfo?.phone}</Typography>
            </div>
            <div className='flex gap-2'>
              <Typography variant='h6'>Country</Typography>
              <Typography>{userInfo?.country}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      <BasicDialog
        fullWidth={true}
        title='Edit Details'
        subTitle=''
        content={<EditProfile setOpen={setOpenEditDetail} data={userInfo} />}
        open={openEditDetail}
        setOpen={setOpenEditDetail}
      />
    </>
  )
}

export default UserProfileHeader
