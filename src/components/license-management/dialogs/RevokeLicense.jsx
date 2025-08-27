// MUI Imports
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

// Redux Imports
import { revokeLicense } from '@redux/license/thunk'

//Reusable Components Imports
import CustomTextField from '@core/components/mui/TextField'

//Constants Imports
import { revokeLicenseDefault } from '@constants/formDefault'

//Utils Imports
import { getFullName } from '@utils/common'

const RevokeLicense = ({ currentRow, setOpen }) => {
  //Redux
  const { isRevokeLoading } = useSelector(state => state.license)
  const dispatch = useDispatch()

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: revokeLicenseDefault
  })

  //Form Button Handler
  const onSubmit = async data => {
    dispatch(revokeLicense({ id: currentRow.id, data, setOpen }))
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <DialogContent className='overflow-visible pbs-0'>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              disabled={true}
              select
              fullWidth
              label={`Are you sure you want to revoke the license for ${getFullName(currentRow?.brand?.user?.firstName, currentRow?.brand?.user?.lastName)}?`}
              placeholder={`Are you sure you want to revoke the license for ${getFullName(currentRow?.brand?.user?.firstName, currentRow?.brand?.user?.lastName)})}?`}
              value='Yes'
            >
              <MenuItem value='Yes'>Yes</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomTextField fullWidth label='Reason for Revocation' placeholder='Enter reason for revocation' />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='justify-center my-4 p-0'>
        <Button type='submit' variant='contained' className='w-[32%]' disabled={isRevokeLoading}>
          {isRevokeLoading ? <CircularProgress color='inherit' size={23} /> : 'Revoke & Notify'}
        </Button>
      </DialogActions>
    </form>
  )
}

export default RevokeLicense
