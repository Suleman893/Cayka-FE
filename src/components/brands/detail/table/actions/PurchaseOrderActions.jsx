// MUI Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

//Third party Imports
import { useSelector, useDispatch } from 'react-redux'

//Redux Imports
import { addPurchaseOrder } from '@redux/brands/thunk'

const PurchaseOrderActions = ({ title, data, setOpen }) => {
  //Redux Imports
  const dispatch = useDispatch()
  const { isAddPOLoading } = useSelector(state => state.brand)

  const submitHandler = () => {
    dispatch(addPurchaseOrder({ id: data.id, setOpen }))
  }

  return (
    <CardContent>
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} display='flex' justifyContent='flex-end'>
          <Button
            className='max-sm:is-full'
            variant='contained'
            type='button'
            color='primary'
            onClick={submitHandler}
            disabled={isAddPOLoading}
          >
            New Purchase Order
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default PurchaseOrderActions
