'use client'

//React Imports
import { useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'

//Reusable Components Import
import CustomTextField from '@core/components/mui/TextField'
import CustomDateRange from '@core/components/mui/CustomDateRanger'

// ApexChart Style Imports
const AppReactApexCharts = dynamic(() => import('@libs/styles/AppReactApexCharts'))

const LineChart = ({ title, series, color, categories, menuId, menuOptions, markerColors, enableFilters = true }) => {
  //Date pickers
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleDateChange = (dates, event) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  // Vars
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

  const options = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    stroke: { curve: 'straight', width: 2 },
    dataLabels: { enabled: false },
    markers: {
      size: 5,
      strokeWidth: 0,
      strokeOpacity: 0,
      colors: markerColors,
      strokeColors: ['#fff']
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      fontSize: '13px',
      markers: {
        offsetY: 0,
        offsetX: -4
      },
      itemMargin: { horizontal: 9 }
    },
    colors: color,
    grid: {
      padding: { top: -10 },
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data) {
        return `<div class='bar-chart'>
          <span>Total Online Devices: 130</span>
        </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      },
      categories: categories
    }
  }

  return (
    <Card>
      <CardContent>
        {/* <div className='flex justify-between items-center w-full max-sm:flex-col gap-5'> */}

        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant='h5'>{title}</Typography>
          </Grid>

          {/* <div className='flex gap-4 max-sm:flex-col'> */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <div className='flex justify-end gap-4 max-sm:flex-col'>
              {enableFilters && (
                <CustomTextField
                  className='max-sm:is-full sm:is-[150px]'
                  select
                  fullWidth
                  id={menuId}
                  slotProps={{
                    select: { displayEmpty: true }
                  }}
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  {/* Dynamically render menu options */}
                  {menuOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}

              <CustomDateRange
                endDate={endDate}
                selected={startDate}
                startDate={startDate}
                handleChange={handleDateChange}
              />
            </div>
          </Grid>
        </Grid>

        {/* </div> */}
      </CardContent>
      <CardContent>
        <AppReactApexCharts type='line' width='100%' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default LineChart
