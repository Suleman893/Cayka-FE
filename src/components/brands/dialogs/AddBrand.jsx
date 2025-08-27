'use client'

//React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// Third-party Imports
import { Controller } from 'react-hook-form'
import CountryFlag from 'react-country-flag'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomPhoneInput from '@core/components/mui/CustomPhoneInput'

//Static Data
import countries from '@data/common/countries'
import { serverTypes } from '@data/brands/brands'

const AddBrand = ({ setSelectedCountryCode, control, errors, serverTypeValue }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Brand Name'
              placeholder='Brand name'
              onChange={e => {
                field.onChange(e.target.value)
              }}
              {...(errors.name && {
                error: true,
                helperText: errors?.name?.message
              })}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
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
              {...(errors.address && { error: true, helperText: errors?.address?.message })}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
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
                    <CountryFlag svg countryCode={option?.code || 'US'} style={{ fontSize: '20px', lineHeight: '1' }} />
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
              {...(errors.firstName && { error: true, helperText: errors.firstName.message })}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Email'
              placeholder='Email'
              onChange={e => {
                field.onChange(e.target.value)
              }}
              {...(errors.email && { error: true, helperText: errors?.email.message })}
            />
          )}
        />
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

      <Grid size={{ xs: 12, sm: 12 }}>
        <Controller
          name='serverType'
          control={control}
          render={({ field }) => (
            <CustomAutocomplete
              {...field}
              fullWidth
              value={serverTypes.find(option => option.value === field.value) || null}
              onChange={(_, value) => {
                field.onChange(value.value)
              }}
              id='select-server-type'
              options={serverTypes}
              getOptionLabel={option => option.label || ''}
              renderOption={(props, option) => {
                const { key, ...rest } = props

                return (
                  <li key={key} {...rest}>
                    <span>{option.label}</span>
                  </li>
                )
              }}
              renderInput={params => (
                <CustomTextField
                  {...params}
                  label='Select Server Type'
                  placeholder='Select a server type'
                  {...(errors.serverType && { error: true, helperText: errors?.serverType?.message })}
                />
              )}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Controller
          name='notes'
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              rows={4}
              multiline
              label='Additional Notes (Optional)'
              placeholder='Note...'
              onChange={e => {
                field.onChange(e.target.value)
              }}
              {...(errors.notes && { error: true, helperText: errors?.notes.message })}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h6'>Share Devices with Cayka</Typography>
        <FormControl>
          <Controller
            name='checkbox'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    disabled={
                      serverTypeValue === 'client_server_custom_app' || serverTypeValue === 'cayka_server_custom_app'
                    }
                  />
                }
                label={<Typography>Enables end-users to control client devices via the Cayka app</Typography>}
              />
            )}
          />
          {errors.checkbox && <FormHelperText error>This field is required.</FormHelperText>}
        </FormControl>
      </Grid>
    </>
  )
}

export default AddBrand
