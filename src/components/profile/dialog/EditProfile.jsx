//React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import CountryFlag from 'react-country-flag'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomPhoneInput from '@core/components/mui/CustomPhoneInput'

//Static Data
import countries from '@data/common/countries'

//Redux Import
import { updateProfile } from '@redux/user/thunk'

//Schema Import
import { updateProfileSchema } from '@schema/user'
import { extractPhoneNo } from '@utils/common'

const EditProfile = ({ setOpen, data }) => {
  //Redux
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.user)

  const [selectedCountryCode, setSelectedCountryCode] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      country: data?.country,
      phone: data?.phone,
      address: data?.address || ''
    }
  })

  useEffect(() => {
    const res = extractPhoneNo(data?.phone, countries)

    setValue('phone', res?.phone)
    setSelectedCountryCode(res?.countryCode)
    setSelectedCountry(res?.country)
  }, [])

  //Button Handlers
  const secondaryBtnHandler = () => {
    setOpen(false)
  }

  const primaryBtnHandler = data => {
    dispatch(
      updateProfile({
        selectedCountryCode,
        data,
        setOpen
      })
    )
  }

  // const isFormDirty = Object.keys(dirtyFields).some(field => field !== 'phone' && dirtyFields[field])

  return (
    <form onSubmit={handleSubmit(primaryBtnHandler)} autoComplete='off'>
      <DialogContent className='overflow-visible pbs-0'>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='First Name'
                  placeholder='First name'
                  onChange={e => {
                    field.onChange(e.target.value)
                  }}
                  {...(errors.firstName && {
                    error: true,
                    helperText: errors?.firstName?.message
                  })}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Last Name'
                  placeholder='Last Name'
                  onChange={e => {
                    field.onChange(e.target.value)
                  }}
                  {...(errors.lastName && { error: true, helperText: errors?.lastName?.message })}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <CustomAutocomplete
                  {...field}
                  fullWidth
                  value={countries.find(option => option.name === field.value) || null}
                  onChange={(_, value) => field.onChange(value.name)}
                  id='select-country'
                  options={countries}
                  getOptionLabel={option => option.name || ''}
                  renderOption={(props, option) => {
                    const { key, ...rest } = props

                    return (
                      <li key={option.id} {...rest} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CountryFlag
                          svg
                          countryCode={option?.code || 'US'}
                          style={{ fontSize: '20px', lineHeight: '1' }}
                        />
                        <span>{option?.name}</span>
                      </li>
                    )
                  }}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      label='Country'
                      placeholder='Select a country'
                      {...(errors.country && { error: true, helperText: errors?.country?.message })}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField disabled={true} fullWidth label='Email' placeholder='Email' defaultValue={data?.email} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <CustomPhoneInput
                  {...field}
                  label='Phone Number'
                  placeholder='Enter phone number'
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  setSelectedCountryCode={setSelectedCountryCode}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name='address'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Address'
                  placeholder='Address'
                  onChange={e => {
                    field.onChange(e.target.value)
                  }}
                  {...(errors.address && { error: true, helperText: errors?.address.message })}
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
        <Button type='submit' variant='contained' className='w-[32%]' disabled={isLoading}>
          {isLoading ? <CircularProgress color='inherit' size={23} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </form>
  )
}

export default EditProfile
