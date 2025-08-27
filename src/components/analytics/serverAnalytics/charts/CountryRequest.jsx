import BarChart from '@components/charts/BarChart'

const CountryRequest = () => {
  const series = [
    {
      data: [250, 500, 950, 450, 300, 790, 190]
    }
  ]

  const menuOptions = [
    { value: '', label: 'All Countries' },
    { value: 'Pakistan', label: 'Pakistan' },
    { value: 'Turkey', label: 'Turkey' }
  ]

  return <BarChart title='Request By Countries' menuId='select-country' menuOptions={menuOptions} series={series} />
}

export default CountryRequest
