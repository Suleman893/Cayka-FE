//React Imports
import { useEffect, useCallback, useRef } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import InputAdornment from '@mui/material/InputAdornment'

//Third party Imports
import { useDispatch } from 'react-redux'
import debounce from 'lodash/debounce'

//Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAsyncPaginate from '@components/commons/AsyncPaginate'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

//Redux Imports
import { allBrandAdmins, allBrands } from '@redux/brands/thunk'
import { allLicenses } from '@redux/license/thunk'

//Helpers Imports
import { fetchPaginatedOptions } from '@helpers/fetchPaginatedOptions'
import { getFullName } from '@utils/common'

//Constants Import
import { PAGE_SIZE, SORT_BY } from '@constants/common'

//Data Import
import { licenseStatusOptions } from '@data/license-managment/license-managment'

const LicenseManagementFilters = ({ page, setPage, filters, setFilters }) => {
  //Redux Imports
  const dispatch = useDispatch()

  // Ref to track the last entered license key
  const lastLicenseKeyRef = useRef('')

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

  const loadBrandAdminOptions = async (searchQuery, loadedOptions, additional) => {
    const page = additional.page || 1

    return fetchPaginatedOptions(
      dispatch,
      allBrandAdmins,
      {
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        name: searchQuery
      },
      searchQuery,
      loadedOptions,
      additional
    )
  }

  // Debounce function accepts licenseKey parameter
  const debouncedFetchLicenses = useCallback(
    debounce(licenseKey => {
      dispatch(
        allLicenses({
          page,
          elements: PAGE_SIZE,
          sortBy: SORT_BY,
          brandId: filters.brandId,
          brandAdminId: filters.brandAdminId,
          licenseKey
        })
      )
    }, 500),
    [page, filters.brandId, filters.brandAdminId]
  )

  // Debounced API call for licenseKey (Using ref to check last entered text, if condition of text exists then filters would have debounce aswell)
  useEffect(() => {
    if (filters.licenseKey !== lastLicenseKeyRef.current) {
      lastLicenseKeyRef.current = filters.licenseKey
      setPage(1)
      debouncedFetchLicenses(filters.licenseKey)
    }
  }, [filters.licenseKey])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomAsyncPaginate
            debounceTimeout={500}
            placeholder='Select Name'
            loadOptions={loadBrandAdminOptions}
            onChange={selected => {
              setFilters(prev => ({ ...prev, brandAdminId: selected?.id || null }))
              setPage(1)
            }}
            getOptionValue={option => option.id}
            getOptionLabel={option => getFullName(option?.firstName, option?.lastName)}
            additional={{ page: 1 }}
            isSearchable={true}
            isClearable={true}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
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
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            fullWidth
            id='select-license-key'
            placeholder='Search By License Key'
            value={filters.licenseKey}
            onChange={e => setFilters(prev => ({ ...prev, licenseKey: e.target.value }))}
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
            id='select-license-status'
            options={licenseStatusOptions}
            onChange={(_, value) => {
              setFilters(prev => ({ ...prev, licenseStatus: value?.value || null }))
              setPage(1)
            }}
            renderInput={params => <CustomTextField {...params} placeholder='Select Status' />}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default LicenseManagementFilters
