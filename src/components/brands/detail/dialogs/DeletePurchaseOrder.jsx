//MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

//Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

//Redux Imports
import { deletePurchaseOrder } from '@redux/brands/thunk'

const DeletePurchaseOrder = ({ data, setOpen }) => {
  //Redux Imports
  const dispatch = useDispatch()
  const { isDeletePOLoading } = useSelector(state => state.brand)

  //Button Handlers
  const secondaryBtnHandler = () => {
    setOpen(false)
  }

  const primaryBtnHandler = () => {
    dispatch(deletePurchaseOrder({ id: data?.id, setOpen }))
  }

  return (
    <>
      <DialogContent className='overflow-visible pbs-0 px-20 py-4'>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography>
              Are you Sure you want to delete Purchase Order:
              <span className='font-semibold'> {data?.poNumber}.</span>
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='justify-center my-2 p-4'>
        <Button type='button' variant='tonal' color='secondary' onClick={secondaryBtnHandler} sx={{ minWidth: '32%' }}>
          Cancel
        </Button>
        <Button
          type='button'
          variant='contained'
          color='error'
          sx={{ minWidth: '32%' }}
          onClick={primaryBtnHandler}
          disabled={isDeletePOLoading}
        >
          {isDeletePOLoading ? <CircularProgress color='inherit' size={23} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </>
  )
}

export default DeletePurchaseOrder
