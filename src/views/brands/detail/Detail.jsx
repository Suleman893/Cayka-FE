'use client'

//React Hooks Imports
import { useEffect } from 'react'

//Next Imports
import { useParams } from 'next/navigation'

//React Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Component Imports
import BreadCrumb from '@components/commons/Breadcrumb'
import BrandBasicInfo from '@components/brands/detail/BrandBasicInfo'
import BrandActivity from '@components/brands/detail/BrandActivity'

//Redux Imports
import { brandDetail } from '@redux/brands/thunk'
import { resetBrandDetail } from '@redux/brands/slice'

const Detail = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { isStatusChangeSuccess } = useSelector(state => state.brand)

  useEffect(() => {
    dispatch(brandDetail({ id }))

    return () => {
      dispatch(resetBrandDetail())
    }
  }, [isStatusChangeSuccess])

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <BreadCrumb title='Brand Details' />
      </Grid>

      {/* Left section */}
      <Grid size={{ xs: 12, md: 4 }}>
        <BrandBasicInfo />
      </Grid>

      {/* Right section */}
      <Grid size={{ xs: 12, md: 8 }}>
        <BrandActivity />
      </Grid>
    </Grid>
  )
}

export default Detail
