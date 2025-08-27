import LineChart from '@components/charts/LineChart'

const PhoneRequest = () => {
  //X-Axis Data
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

  //Area Colors
  const areaColors = {
    series1: '#0A5066',
    series2: '#14A0CC'
  }

  //Series Data
  const series = [
    {
      name: 'Android',
      data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280]
    },
    {
      name: 'IOS',
      data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275]
    }
  ]

  const menuOptions = [
    { value: '', label: 'All Platforms' },
    { value: 'Android', label: 'Android' },
    { value: 'IOS', label: 'IOS' }
  ]

  //Colors
  const color = [areaColors.series1, areaColors.series2]

  return (
    <LineChart
      title='Request By Android & IOS'
      color={color}
      series={series}
      categories={categories}
      menuId='select-phone'
      menuOptions={menuOptions}
    />
  )
}

export default PhoneRequest
