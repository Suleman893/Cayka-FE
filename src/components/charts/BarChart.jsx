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

//Reusable Components
import CustomTextField from '@core/components/mui/TextField'
import CustomDateRange from '@core/components/mui/CustomDateRanger'

// ApexChart Style Imports
const AppReactApexCharts = dynamic(() => import('@libs/styles/AppReactApexCharts'))

const BarChart = ({ title, menuId, menuOptions, series }) => {
  //Date pickers
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleDateChange = (dates, event) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  var options = {
    chart: {
      type: 'bar',
      height: 450,
      toolbar: {
        show: true,
        tools: {
          download: false // Hide the download button
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    colors: ['#0A5066'],
    dataLabels: {
      enabled: true,
      offsetX: -15,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#0A5066']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: ['Turkey', 'Pak', 'Georgia', 'Afghanistan', 'Haiti', 'Monaco', 'Guinea']
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
        <AppReactApexCharts type='bar' width='100%' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default BarChart
