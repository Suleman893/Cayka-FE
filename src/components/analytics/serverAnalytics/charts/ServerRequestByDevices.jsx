import LineChart from '@components/charts/LineChart'

const ServerRequestByDevices = () => {
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
    series1: '#28C76F',
    series2: '#FF4961'
  }

  const series = [
    {
      name: 'Online',
      data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280]
    },
    {
      name: 'Offline',
      data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275]
    }
  ]

  const menuOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'In Active' }
  ]

  const markerColors = ['#0A5066', '#14A0CC']

  const color = [areaColors.series1, areaColors.series2]

  return (
    <LineChart
      title='Device Activities'
      color={color}
      series={series}
      categories={categories}
      menuId='select-online'
      menuOptions={menuOptions}
      markerColors={markerColors}
    />
  )
}

export default ServerRequestByDevices
