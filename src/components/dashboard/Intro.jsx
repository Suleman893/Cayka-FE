//Redux Imports
import { useSelector } from 'react-redux'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const Intro = ({ setOpen }) => {
  const { userInfo } = useSelector(state => state.user)

  return (
    <div className='flex flex-wrap justify-between gap-6 sm:items-center max-sm:flex-col'>
      <div>
        <Typography variant='h4'>Hi {userInfo?.firstName}!</Typography>
        <Typography>Create, manage, and track your devices across home.</Typography>
      </div>
      <Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={() => setOpen(true)}>
        Add New Brand
      </Button>
    </div>
  )
}

export default Intro
