'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux'

import { basicAnalytics } from '@redux/dashboard/thunk'

//Static Data Import
import { basicStats } from '@data/dashboard/dashboard'

//Reusable Components
import BasicStats from '@components/cards/BasicStats'

const BasicMetrics = () => {
  const [updatedStats, setUpdatedStats] = useState([])
  const { basicAnalytic, isBasicAnalyticsSuccess } = useSelector(state => state.dashboard)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(basicAnalytics())
  }, [])

  useEffect(() => {
    const updatedStats = basicStats.map(item => {
      switch (item.title) {
        case 'Total Brands':
          return { ...item, stats: basicAnalytic?.brandsTotal || 0 }
        case 'Total Active Devices':
          return { ...item, stats: basicAnalytic?.activeDevicesTotal || 0 }
        case 'Total Brand Admin':
          return { ...item, stats: basicAnalytic?.brandAdminTotal || 0 }
        case 'Active License':
          return { ...item, stats: basicAnalytic?.activeLicenseTotal || 0 }
        case 'Expired License':
          return { ...item, stats: basicAnalytic?.inActiveLicenseTotal || 0 }
        default:
          return item
      }
    })

    setUpdatedStats(updatedStats)
  }, [isBasicAnalyticsSuccess])

  return (
    <Grid container spacing={6}>
      {updatedStats.map((item, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 2.4 }}>
          <BasicStats {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default BasicMetrics
