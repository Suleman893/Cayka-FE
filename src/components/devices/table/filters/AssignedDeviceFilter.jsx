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
import { allAssignedDevices } from '@redux/devices/thunk'

//Data Import
import { deviceStatusOptions, deviceTypesOptions } from '@data/devices/devices'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const AssignedDeviceFilters = ({ page, setPage, filters, setFilters }) => {
  //Redux Imports
  const dispatch = useDispatch()

  // Ref to track the last entered license key
  const lastDeviceIdRef = useRef('')

  // Debounce function accepts deviceId parameter
  const debouncedDeviceIdFetch = useCallback(
    debounce(deviceId => {
      dispatch(
        allAssignedDevices({
          page,
          elements: PAGE_SIZE,
          sortBy: SORT_BY,
          deviceType: filters.deviceType,
          deviceStatus: filters.deviceStatus,
          brandName: filters.brandName,
          deviceId
        })
      )
    }, 500),
    [page, filters.deviceType, filters.deviceStatus]
  )

  // Debounced API call for deviceId (only when text has changed)
  useEffect(() => {
    if (filters.deviceId !== lastDeviceIdRef.current) {
      lastDeviceIdRef.current = filters.deviceId
      setPage(1)
      debouncedDeviceIdFetch(filters.deviceId)
    }
  }, [filters.deviceId])

  //Brand name searching

  // Ref to track the last entered license key
  const lastBrandNameRef = useRef('')

  // Debounce function accepts brandName parameter
  const debouncedBrandNameFetch = useCallback(
    debounce(brandName => {
      dispatch(
        allAssignedDevices({
          page,
          elements: PAGE_SIZE,
          sortBy: SORT_BY,
          deviceId: filters.deviceId,
          deviceType: filters.deviceType,
          deviceStatus: filters.deviceStatus,
          brandName
        })
      )
    }, 500),
    [page, filters.deviceType, filters.deviceStatus]
  )

  // Debounced API call for brand name (only when text has changed)
  useEffect(() => {
    if (filters.brandName !== lastBrandNameRef.current) {
      lastBrandNameRef.current = filters.brandName
      setPage(1)
      debouncedBrandNameFetch(filters.brandName)
    }
  }, [filters.brandName])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            fullWidth
            id='select-brand-name'
            placeholder='Search by Brand Name'
            value={filters.brandName}
            onChange={e => setFilters(prev => ({ ...prev, brandName: e.target.value }))}
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
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            fullWidth
            id='select-device-id'
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
        <Grid size={{ xs: 12, sm: 3 }}>
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
        <Grid size={{ xs: 12, sm: 3 }}>
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

export default AssignedDeviceFilters
