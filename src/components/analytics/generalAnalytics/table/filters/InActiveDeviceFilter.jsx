// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

//Third party Imports
import { useDispatch } from 'react-redux'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAsyncPaginate from '@components/commons/AsyncPaginate'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

//Redux Imports
import { allBrands } from '@redux/brands/thunk'

//Helpers Imports
import { fetchPaginatedOptions } from '@helpers/fetchPaginatedOptions'

//Constants Import
import { PAGE_SIZE, SORT_BY } from '@constants/common'

//Data Import
import { deviceTypesOptions } from '@data/devices/devices'

const InActiveDeviceFilters = ({ setPage, setFilters }) => {
  //Redux Imports
  const dispatch = useDispatch()

  const loadBrandOptions = async (searchQuery, loadedOptions, additional) => {
    const page = additional.page || 1

    return fetchPaginatedOptions(
      dispatch,
      allBrands,
      {
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        brandName: searchQuery
      },
      searchQuery,
      loadedOptions,
      additional
    )
  }

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
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

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomAsyncPaginate
            debounceTimeout={500}
            placeholder='Select Brand'
            onChange={selected => {
              setFilters(prev => ({ ...prev, brandId: selected?.id || null }))
              setPage(1)
            }}
            loadOptions={loadBrandOptions}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            additional={{ page: 1 }}
            isSearchable={true}
            isClearable={true}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default InActiveDeviceFilters
