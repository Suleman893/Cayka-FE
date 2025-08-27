// React Imports
import { useEffect, useCallback, useRef } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import InputAdornment from '@mui/material/InputAdornment'

//Third Party Imports
import { useDispatch } from 'react-redux'
import debounce from 'lodash/debounce'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAsyncPaginate from '@components/commons/AsyncPaginate'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

// Redux Imports
import { allConsumers } from '@redux/consumers/thunk'
import { allBrands } from '@redux/brands/thunk'

//Helpers Imports
import { fetchPaginatedOptions } from '@helpers/fetchPaginatedOptions'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

//Static Data
import { consumerStatusOptions } from '@data/consumers/consumers'

const ConsumerFilters = ({ page, setPage, filters, setFilters }) => {
  //Redux Imports
  const dispatch = useDispatch()

  //Ref to track the last entered phone
  const lastPhoneRef = useRef('')

  // Debounce function accepts phone parameter
  const debouncedFetchPhone = useCallback(
    debounce(phone => {
      dispatch(
        allConsumers({
          page,
          elements: PAGE_SIZE,
          sortBy: SORT_BY,
          brandId: filters.brandId,
          status: filters.status,
          phone
        })
      )
    }, 500),
    [page, filters.brandId, filters.status]
  )

  // Debounced API call for name (only when text has changed)
  useEffect(() => {
    if (filters.phone !== lastPhoneRef.current) {
      lastPhoneRef.current = filters.phone
      setPage(1)
      debouncedFetchPhone(filters.phone)
    }
  }, [filters.phone])

  //Brand select options
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
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            fullWidth
            id='search-mobile'
            placeholder='Search By Mobile Number'
            value={filters.phone}
            onChange={e => setFilters(prev => ({ ...prev, phone: e.target.value }))}
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

        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomAutocomplete
            disableClearable={false}
            fullWidth
            id='select-status'
            options={consumerStatusOptions}
            onChange={(_, value) => {
              setFilters(prev => ({ ...prev, status: value?.value || null }))
              setPage(1)
            }}
            renderInput={params => <CustomTextField {...params} placeholder='Select Status' />}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default ConsumerFilters
