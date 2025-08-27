//MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

//Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

//Helpers Import
import { snakeToPascalConverter } from '@utils/common'

//Redux Imports
import { changeStatus } from '@redux/devices/thunk'

const ChangeStatus = ({ setIsChecked, setOpen }) => {
  //Redux
  const dispatch = useDispatch()
  const { deviceDetail, isStatusChangeLoading } = useSelector(state => state.device)

  //Button Handlers
  const secondaryBtnHandler = () => {
    setIsChecked && setIsChecked(deviceDetail?.status === 'online' ? true : false)
    setOpen(false)
  }

  const primaryBtnHandler = () => {
    dispatch(
      changeStatus({
        id: deviceDetail?.id,
        status: deviceDetail?.status === 'online' ? 'offline' : 'online',
        setOpen
      })
    )
  }

  return (
    <>
      <DialogContent className='overflow-visible pbs-0'>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12 }}>
            <Typography>
              Are you sure you want to change status of
              <span className='font-semibold'> {deviceDetail?.deviceId} </span>
              from&nbsp;{snakeToPascalConverter(deviceDetail?.status)} to{' '}
              {deviceDetail?.status === 'online' ? 'Offline' : 'Online'}?
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='justify-center my-8 p-0'>
        <Button type='button' variant='tonal' color='secondary' className='w-[32%]' onClick={secondaryBtnHandler}>
          Cancel
        </Button>
        <Button
          type='button'
          variant='contained'
          className='w-[32%]'
          onClick={primaryBtnHandler}
          disabled={isStatusChangeLoading}
        >
          {isStatusChangeLoading ? <CircularProgress color='inherit' size={23} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </>
  )
}

export default ChangeStatus
