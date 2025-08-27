'use client'

//React Imports
import { useState, useMemo } from 'react'

//TanStack Imports
import { createColumnHelper } from '@tanstack/react-table'

//Reusable Component
import DeviceTypeAction from '@components/analytics/generalAnalytics/table/actions/DeviceTypeAction'
import DeviceFilter from '@components/analytics/generalAnalytics/table/filters/DeviceFilter'
import Table from '@components/table/Table'

//Data Imports
import { devicesType } from '@data/analytics/analytics'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const DeviceTypeTable = () => {
  //Pagination
  const [page, setPage] = useState(1)

  // Column Definitions
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('deviceType', {
        cell: info => info.getValue(),
        header: 'Device Type'
      }),
      columnHelper.accessor('deviceTypeId', {
        cell: info => info.getValue(),
        header: 'Device Type Id'
      }),
      columnHelper.accessor('brandName', {
        cell: info => info.getValue(),
        header: 'Brand Name'
      }),
      columnHelper.accessor('poNo', {
        cell: info => info.getValue(),
        header: 'P.O Number'
      }),
      columnHelper.accessor('totalConsumers', {
        cell: info => info.getValue(),
        header: 'Consumers'
      }),
      columnHelper.accessor('totalSold', {
        cell: info => info.getValue(),
        header: 'Total Sold'
      })
    ],
    []
  )

  return (
    <Table
      columns={columns}
      actions={<DeviceTypeAction title='Devices Types' />}
      filters={<DeviceFilter />}
      data={devicesType}
      totalElements={devicesType.length}
      elementsPerPage={PAGE_SIZE}
      page={page}
      setPage={setPage}
    />
  )
}

export default DeviceTypeTable
