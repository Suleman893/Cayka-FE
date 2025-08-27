import LineChart from '@components/charts/LineChart'

const TotalServerRequest = () => {
  const categories = [
    '7/12',
    '8/12',
    '9/12',
    '10/12',
    '11/12',
    '12/12',
    '13/12',
    '14/12',
    '15/12',
    '16/12',
    '17/12',
    '18/12',
    '19/12'
  ]

  const areaColors = {
    series: '#0A5066'
  }

  const series = [
    {
      name: 'Online',
      data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 380]
    }
  ]

  const menuOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
  ]

  const color = [areaColors.series]

  return (
    <LineChart
      title='Server Request Activities'
      series={series}
      color={color}
      categories={categories}
      menuId='select-status'
      menuOptions={menuOptions}
      enableFilters={false}
    />
  )
}

export default TotalServerRequest
