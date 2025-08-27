'use client'

//MUI Imports
import Grid from '@mui/material/Grid2'

//Third-party Imports
import { Controller } from 'react-hook-form'

//Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddInvoiceId = ({ control, errors, getValues }) => {
  const brandPurchaseOrder = getValues('brandPurchaseOrder')
  const invoiceIdValue = brandPurchaseOrder?.invoiceId || ''

  return (
    <Grid size={{ xs: 12 }}>
      <Controller
        name='invoiceId'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='Add Invoice ID'
            placeholder='#12345'
            onChange={e => field.onChange(e.target.value)}
            disabled={!!invoiceIdValue}
            {...(errors.invoiceId && {
              error: true,
              helperText: errors?.invoiceId?.message
            })}
          />
        )}
      />
    </Grid>
  )
}

export default AddInvoiceId
