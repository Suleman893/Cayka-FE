//MUI Imports
import Grid from '@mui/material/Grid2'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

//Component Imports
import LeftSection from '@components/consumers/detail/dialogs/LeftSection'
import RightSection from '@components/consumers/detail/dialogs/RightSection'
import ActivityLogs from '@components/cards/ActivityLogs'

//Data Imports
import { deviceActivityLog } from '@data/consumers/consumers'

const DevicesDetail = ({ data, setOpen }) => {
  //Button Handlers
  const secondaryBtnHandler = () => {
    setOpen(false)
  }

  return (
    <>
      <DialogContent className='overflow-visible pbs-0 px-15 py-4'>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 6, md: 6 }}>
            <LeftSection data={data} />
          </Grid>
          <Grid size={{ xs: 12, lg: 6, md: 6 }}>
            <RightSection />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ActivityLogs title='Device Activity Log' data={deviceActivityLog} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='justify-center my-2 p-4'>
        <Button sx={{ minWidth: '32%' }} type='button' variant='tonal' color='secondary' onClick={secondaryBtnHandler}>
          Cancel
        </Button>
        <Button sx={{ minWidth: '32%' }} type='button' variant='contained'>
          Save Changes
        </Button>
      </DialogActions>
    </>
  )
}

export default DevicesDetail
