// MUI Imports
import Grid from '@mui/material/Grid2'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import dayjs from 'dayjs'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomDatePicker from '@core/components/mui/CustomDatePicker'

//Redux Imports
import { renewLicense } from '@redux/license/thunk'

// Schema Imports
import { renewLicenseSchema } from '@schema/license'

//Constants Imports
import { renewLicenseDefault } from '@constants/formDefault'

//Utils Imports
import { getFullName } from '@utils/common'

const RenewLicense = ({ currentRow, setOpen }) => {
  //Redux
  const dispatch = useDispatch()

  const { isRenewLoading } = useSelector(state => state.license)

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(renewLicenseSchema),
    defaultValues: renewLicenseDefault
  })

  const onSubmit = async data => {
    dispatch(renewLicense({ id: currentRow.id, data, setOpen }))
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <DialogContent className='overflow-visible pbs-0'>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField
              fullWidth
              label='First Name'
              disabled={true}
              defaultValue={currentRow?.brand?.user?.firstName}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField
              fullWidth
              label='Last Name'
              disabled={true}
              defaultValue={currentRow?.brand?.user?.lastName}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              fullWidth
              label='Username'
              disabled={true}
              defaultValue={getFullName(currentRow?.brand?.user?.firstName, currentRow?.brand?.user?.lastName)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField fullWidth label='Email' disabled={true} defaultValue={currentRow?.brand?.user?.email} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              fullWidth
              label='Input License Key'
              disabled={true}
              defaultValue={currentRow?.licenseKey}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomDatePicker label='Select End Date'>
              <Controller
                name='endDate'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={date => field.onChange(dayjs(date).format())}
                    disablePast
                    size='small'
                    clearable
                    format='DD/MM/YYYY'
                    slotProps={{
                      textField: {
                        size: 'small',
                        readOnly: true,
                        error: !!errors.endDate,
                        helperText: errors.endDate?.message
                      }
                    }}
                  />
                )}
              />
            </CustomDatePicker>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='justify-center my-4 p-0'>
        <Button type='submit' variant='contained' className='w-[32%]' disabled={isRenewLoading}>
          {isRenewLoading ? <CircularProgress color='inherit' size={23} /> : 'Generate & Send'}
        </Button>
      </DialogActions>
    </form>
  )
}

export default RenewLicense
