//MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

//Third party imports
import { useDispatch, useSelector } from 'react-redux'

//Redux Imports
import { deleteUnassignDevice } from '@redux/devices/thunk'

const DeleteDevice = ({ data, setOpen }) => {
  //Redux Imports
  const dispatch = useDispatch()
  const { isDeleteDeviceLoading } = useSelector(state => state.device)

  //Button Handlers
  const secondaryBtnHandler = () => {
    setOpen(false)
  }

  const primaryBtnHandler = () => {
    dispatch(
      deleteUnassignDevice({
        id: data?.id,
        setOpen
      })
    )
  }

  return (
    <>
      <DialogContent className='overflow-visible pbs-0 px-20 py-4'>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography>
              Are you Sure you want to delete Device ID:
              <span className='font-semibold'> #{data?.deviceId}.</span>
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='justify-center my-2 p-4'>
        <Button sx={{ minWidth: '32%' }} type='button' variant='tonal' color='secondary' onClick={secondaryBtnHandler}>
          Cancel
        </Button>
        <Button
          sx={{ minWidth: '32%' }}
          type='button'
          variant='contained'
          color='error'
          onClick={primaryBtnHandler}
          disabled={isDeleteDeviceLoading}
        >
          {isDeleteDeviceLoading ? <CircularProgress color='inherit' size={23} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </>
  )
}

export default DeleteDevice
