//React Imports
import { useEffect, useCallback, useRef } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import InputAdornment from '@mui/material/InputAdornment'

//Third party Imports
import { useDispatch } from 'react-redux'
import debounce from 'lodash/debounce'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

//Redux Imports
import { allInventoryDevices } from '@redux/devices/thunk'
import { deviceStatusOptions, deviceTypesOptions } from '@data/devices/devices'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const UnAssignedDeviceFilter = ({ page, setPage, filters, setFilters }) => {
  //Redux Imports
  const dispatch = useDispatch()

  // Ref to track the last entered license key
  const lastDeviceIdRef = useRef('')

  // Debounce function accepts deviceId parameter
  const debouncedFetchLicenses = useCallback(
    debounce(deviceId => {
      dispatch(
        allInventoryDevices({
          page,
          elements: PAGE_SIZE,
          sortBy: SORT_BY,
          deviceId,
          deviceType: filters.deviceType,
          deviceStatus: filters.deviceStatus
        })
      )
    }, 500),
    [page, filters.deviceType, filters.deviceStatus]
  )

  // Debounced API call for licenseKey (only when text has changed)
  useEffect(() => {
    if (filters.deviceId !== lastDeviceIdRef.current) {
      lastDeviceIdRef.current = filters.deviceId
      setPage(1)
      debouncedFetchLicenses(filters.deviceId)
    }
  }, [filters.deviceId])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            fullWidth
            id='select-status'
            placeholder='Search by Device ID'
            value={filters.deviceId}
            onChange={e => setFilters(prev => ({ ...prev, deviceId: e.target.value }))}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-search' />
                  </InputAdornment>
                )
              }
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomAutocomplete
            disableClearable={false}
            fullWidth
            id='select-device-type'
            options={deviceTypesOptions}
            onChange={(_, value) => {
              setFilters(prev => ({ ...prev, deviceType: value?.value || null }))
              setPage(1)
            }}
            renderInput={params => <CustomTextField {...params} placeholder='Select Device Type' />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomAutocomplete
            disableClearable={false}
            fullWidth
            id='select-device-status'
            options={deviceStatusOptions}
            onChange={(_, value) => {
              setFilters(prev => ({ ...prev, deviceStatus: value?.value || null }))
              setPage(1)
            }}
            renderInput={params => <CustomTextField {...params} placeholder='Select Status' />}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default UnAssignedDeviceFilter
