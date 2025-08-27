// React Imports
import { useCallback, useRef, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

//Third party Imports
import { useDispatch } from 'react-redux'
import debounce from 'lodash/debounce'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

//Redux Imports
import { allBrands } from '@redux/brands/thunk'

const BrandFilter = ({ page, setPage, filters, setFilters }) => {
  const dispatch = useDispatch()

  //Ref to track the last entered brand name
  const lastBrandNameRef = useRef('')

  // Debounce function accepts brand name parameter
  const debounceBrandNameFetch = useCallback(
    debounce(brandName => {
      dispatch(
        allBrands({
          page,
          elements: PAGE_SIZE,
          sortBy: SORT_BY,
          brandName
        })
      )
    }, 500),
    [page]
  )

  // Debounced API call for brand name (only when text has changed)
  useEffect(() => {
    if (filters.brandName !== lastBrandNameRef.current) {
      lastBrandNameRef.current = filters.brandName
      setPage(1)
      debounceBrandNameFetch(filters.brandName)
    }
  }, [filters.brandName])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            id='search-brand'
            placeholder='Search Brand By Name'
            className='max-sm:is-full'
            value={filters.brandName}
            onChange={e => setFilters(prev => ({ ...prev, brandName: e.target.value }))}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default BrandFilter
