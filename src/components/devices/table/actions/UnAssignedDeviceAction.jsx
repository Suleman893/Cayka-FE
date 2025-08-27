// React Imports
import { useState } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

//Components Imports
import UploadDeviceFile from '@components/commons/dialogs/UploadFile'
import BasicDialog from '@core/components/mui/BasicDialog'

const UnAssignedDeviceAction = ({ title }) => {
  const [openUploadModal, setOpenUploadModal] = useState(false)

  return (
    <>
      <CardContent>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant='h5'>{title}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <div className='flex justify-end gap-4 max-sm:flex-col'>
              <Button variant='contained' onClick={() => setOpenUploadModal(true)}>
                Upload Devices
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <BasicDialog
        fullWidth={true}
        content={<UploadDeviceFile setOpen={setOpenUploadModal} />}
        title='Upload File'
        subTitle=''
        open={openUploadModal}
        setOpen={setOpenUploadModal}
      />
    </>
  )
}

export default UnAssignedDeviceAction
