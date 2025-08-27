'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'

//Icon Imports
import BackArrow from '@assets/svg/BackArrow'

const BreadCrumb = ({ title }) => {
  const router = useRouter()

  return (
    <div className='flex items-center gap-3'>
      <BackArrow clickHandler={() => router.back()} />
      <Typography variant='h5'>{title}</Typography>
    </div>
  )
}

export default BreadCrumb
