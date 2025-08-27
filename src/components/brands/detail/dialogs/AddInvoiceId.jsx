'use client'

//MUI Imports
import Grid from '@mui/material/Grid2'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

//Third-party Imports
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//Component Imports
import CustomTextField from '@core/components/mui/TextField'

//Redux Imports
import { addInvoice } from '@redux/brands/thunk'

//Schema Imports
import { addInvoiceSchema } from '@schema/brand'

//Constants Imports
import { addInvoiceDefault } from '@constants/formDefault'

const AddInvoiceId = ({ data, setOpen }) => {
  //Select row item
  const { id } = data

  //Redux
  const dispatch = useDispatch()
  const { isAddInvoiceLoading } = useSelector(state => state.brand)

  //React hook form
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(addInvoiceSchema),
    defaultValues: addInvoiceDefault
  })

  //Button Handlers
  const secondaryBtnHandler = () => {
    setOpen(false)
  }

  const primaryBtnHandler = data => {
    dispatch(addInvoice({ id, data, setOpen }))
  }

  return (
    <form onSubmit={handleSubmit(primaryBtnHandler)} autoComplete='off'>
      <DialogContent className='overflow-visible pbs-0'>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name='invoiceId'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  fullWidth
                  label='Add Invoice ID'
                  placeholder='#12345'
                  onChange={e => field.onChange(e.target.value)}
                  {...(errors.invoiceId && {
                    error: true,
                    helperText: errors?.invoiceId?.message
                  })}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className='justify-center my-8 p-0'>
        <Button type='button' variant='tonal' color='secondary' className='w-[32%]' onClick={secondaryBtnHandler}>
          Cancel
        </Button>
        <Button type='submit' variant='contained' className='w-[32%]' disabled={isAddInvoiceLoading}>
          {isAddInvoiceLoading ? <CircularProgress color='inherit' size={23} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </form>
  )
}

export default AddInvoiceId
