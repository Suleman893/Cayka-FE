//MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

//Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

//Redux Import
import { changeStatus } from '@redux/consumers/thunk'

//Helpers Import
import { consumerStatusCheck } from '@/helpers/common'
import { getFullName } from '@/utils/common'

//Redux Imports

const ChangeStatus = ({ data, setIsChecked, setOpen }) => {
  //Redux
  const dispatch = useDispatch()
  const { isStatusChangeLoading } = useSelector(state => state.consumer)

  //Button Handlers
  const secondaryBtnHandler = () => {
    setIsChecked && setIsChecked(data?.isVerified || false)
    setOpen(false)
  }

  const primaryBtnHandler = () => {
    dispatch(
      changeStatus({
        id: data?.id,
        isVerified: data?.isVerified ? false : true,
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
              <span className='font-semibold'> {getFullName(data?.firstName, data?.lastName)} </span>
              from&nbsp;{consumerStatusCheck(data?.isVerified)} to {data?.isVerified ? 'Inactive' : 'Active'}?
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
