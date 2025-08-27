// MUI Imports
import { useState } from 'react'

import Grid from '@mui/material/Grid2'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

//Third party imports
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'

//Reusable Components Imports
import CustomDatePicker from '@core/components/mui/CustomDatePicker'

const AddLicenseDate = ({ control, errors }) => {
  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)

  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CustomDatePicker label='Select Start Date'>
          <Controller
            name='startDate'
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
                open={openStartDate}
                onOpen={() => setOpenStartDate(true)}
                onClose={() => setOpenStartDate(false)}
                slotProps={{
                  textField: {
                    size: 'small',
                    readOnly: true,
                    error: !!errors.startDate,
                    helperText: errors.startDate?.message,
                    onClick: event => {
                      setOpenStartDate(!openStartDate)
                    }
                  }
                }}
              />
            )}
          />
        </CustomDatePicker>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
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
                format='DD/MM/YYYY'
                open={openEndDate}
                onOpen={() => setOpenEndDate(true)}
                onClose={() => setOpenEndDate(false)}
                slotProps={{
                  textField: {
                    size: 'small',
                    readOnly: true,
                    error: !!errors.endDate,
                    helperText: errors.endDate?.message,
                    onClick: event => {
                      setOpenEndDate(!openEndDate)
                    }
                  }
                }}
              />
            )}
          />
        </CustomDatePicker>
      </Grid>
    </>
  )
}

export default AddLicenseDate
