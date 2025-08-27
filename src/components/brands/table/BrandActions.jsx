// React Imports
import { useState, useCallback, useRef, useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

//Third party Imports
import { useDispatch } from 'react-redux'
import debounce from 'lodash/debounce'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import AddNewBrand from '@components/brands/dialogs/AddNewBrand'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

//Redux Imports
import { allBrands } from '@redux/brands/thunk'

const BrandActions = ({ title, page, setPage, filters, setFilters }) => {
  const [open, setOpen] = useState(false)

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
          brandStatus: filters?.brandStatus,
          brandCountry: filters?.brandCountry,
          brandName
        })
      )
    }, 500),
    [page, filters?.brandStatus, filters.brandCountry]
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
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 12, sm: 2 }}>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 10 }}>
          <div className='flex justify-end gap-4 max-sm:flex-col'>
            <CustomTextField
              id='search-brand'
              placeholder='Search Brand'
              className='max-sm:is-full md:min-is-[250px]'
              value={filters.brandName}
              onChange={e => setFilters(prev => ({ ...prev, brandName: e.target.value }))}
            />
            <Button
              variant='tonal'
              className='max-sm:is-full'
              color='secondary'
              startIcon={<i className='tabler-upload' />}
            >
              Export
            </Button>
            <Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={() => setOpen(true)}>
              Add New Brand
            </Button>
          </div>
        </Grid>
      </Grid>

      {open && <AddNewBrand open={open} setOpen={setOpen} title='Add Brands' />}
    </CardContent>
  )
}

export default BrandActions
