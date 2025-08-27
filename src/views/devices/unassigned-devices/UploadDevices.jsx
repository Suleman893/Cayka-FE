// React Imports
import { useState } from 'react'

// MUI Imports
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

//Components Imports
import BasicDialog from '@core/components/mui/BasicDialog'
import UploadFile from '@components/commons/dialogs/UploadFile'
import TableLoader from '@components/commons/loaders/TableLoader'

const UploadDevices = ({ isLoading }) => {
  const [openUploadModal, setOpenUploadModal] = useState(false)

  if (isLoading) return <TableLoader />

  return (
    <>
      <Paper className='flex items-center justify-center' sx={{ height: '75vh' }}>
        <div className='flex flex-col justify-center items-center gap-5 w-[80%] text-center'>
          <Typography variant='h3'>Nothing to show</Typography>
          <Typography variant='body2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco l
          </Typography>
          <Button variant='contained' onClick={() => setOpenUploadModal(true)}>
            Upload Devices
          </Button>
        </div>
      </Paper>
      <BasicDialog
        fullWidth={true}
        content={<UploadFile setOpen={setOpenUploadModal} />}
        title='Upload File'
        subTitle=''
        open={openUploadModal}
        setOpen={setOpenUploadModal}
      />
    </>
  )
}

export default UploadDevices
