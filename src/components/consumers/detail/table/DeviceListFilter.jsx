// React Imports
import { useEffect, useCallback, useRef } from 'react'

//Next Imports
import { useParams } from 'next/navigation'

//Third Party Imports
import { useDispatch } from 'react-redux'
import debounce from 'lodash/debounce'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import InputAdornment from '@mui/material/InputAdornment'

// Redux Imports
import { allBrands } from '@redux/brands/thunk'
import { allConsumerDevices } from '@redux/consumers/thunk'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAsyncPaginate from '@components/commons/AsyncPaginate'

//Helpers Imports
import { fetchPaginatedOptions } from '@helpers/fetchPaginatedOptions'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import { consumerDeviceStatusOptions } from '@data/consumers/consumers'

const DeviceListFilter = ({ page, setPage, filters, setFilters }) => {
  const { id } = useParams()

  const dispatch = useDispatch()

  //Ref to track the last entered name
  const lastDeviceIdRef = useRef('')

  // Debounce function accepts deviceId parameter
  const debouncedDeviceId = useCallback(
    debounce(deviceId => {
      dispatch(
        allConsumerDevices({
          id,
          page,
          elements: PAGE_SIZE,
          sortBy: SORT_BY,
          deviceStatus: filters.deviceStatus,
          deviceId
        })
      )
    }, 500),
    [page, filters.deviceStatus]
  )

  // Debounced API call for deviceId (only when text has changed)
  useEffect(() => {
    if (filters.deviceId !== lastDeviceIdRef.current) {
      lastDeviceIdRef.current = filters.deviceId
      setPage(1)
      debouncedDeviceId(filters.deviceId)
    }
  }, [filters.deviceId])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            fullWidth
            id='select-device-id'
            placeholder='By Device Id'
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
          <CustomAsyncPaginate
            placeholder='Select Brand'

            // debounceTimeout={500}
            // onChange={selected => {
            //   setFilters(prev => ({ ...prev, brandId: selected?.id || null }))
            //   setPage(1)
            // }}
            // loadOptions={loadBrandOptions}
            // getOptionValue={option => option.id}
            // getOptionLabel={option => option.name}
            // additional={{ page: 1 }}
            // isSearchable={true}
            // isClearable={true}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomAutocomplete
            disableClearable={false}
            fullWidth
            id='select-device-status'
            options={consumerDeviceStatusOptions}
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

export default DeviceListFilter
