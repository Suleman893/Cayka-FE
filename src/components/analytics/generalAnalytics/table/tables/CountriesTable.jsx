'use client'

//React Imports
import { useState, useMemo } from 'react'

//TanStack Imports
import { createColumnHelper } from '@tanstack/react-table'

//Data
import { allCountries } from '@data/analytics/analytics'

//Reusable Component
import Table from '@components/table/Table'
import CountryFilter from '@components/analytics/generalAnalytics/table/filters/CountryFilter'
import CountryAction from '@components/analytics/generalAnalytics/table/actions/CountryAction'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const CountriesTable = () => {
  //Pagination
  const [page, setPage] = useState(1)

  // Column Definitions
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('country', {
        cell: info => info.getValue(),
        header: 'Country'
      }),
      columnHelper.accessor('brands', {
        cell: info => info.getValue(),
        header: 'Brand'
      }),
      columnHelper.accessor('devices', {
        cell: info => info.getValue(),
        header: 'Devices'
      }),
      columnHelper.accessor('users', {
        cell: info => info.getValue(),
        header: 'Users'
      })
    ],
    []
  )

  return (
    <Table
      columns={columns}
      actions={<CountryAction title='Countries List' />}
      filters={<CountryFilter />}
      data={allCountries}
      totalElements={allCountries.length}
      elementsPerPage={PAGE_SIZE}
      page={page}
      setPage={setPage}
    />
  )
}

export default CountriesTable
