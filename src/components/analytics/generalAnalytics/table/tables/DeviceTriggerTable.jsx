'use client'

//React Imports
import { useState, useMemo } from 'react'

//TanStack Imports
import { createColumnHelper } from '@tanstack/react-table'

//Data
import { allTrigger } from '@data/analytics/analytics'

//Reusable Component
import Table from '@components/table/Table'
import DeviceTriggerFilters from '@components/analytics/generalAnalytics/table/filters/DeviceTriggerFilter'
import DeviceTriggerAction from '@components/analytics/generalAnalytics/table/actions/DeviceTriggerAction'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const DeviceTriggerTable = () => {
  //Pagination
  const [page, setPage] = useState(1)

  // Column Definitions
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('deviceType', {
        header: 'Device Type',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('deviceTypeId', {
        cell: info => info.getValue(),
        header: 'Device Type Id'
      }),
      columnHelper.accessor('deviceId', {
        cell: info => info.getValue(),
        header: 'Device Id'
      }),
      columnHelper.accessor('lastTriggered', {
        cell: info => info.getValue(),
        header: 'Last Triggered'
      }),
      columnHelper.accessor('trigger', {
        cell: info => info.getValue(),
        header: 'Trigger'
      }),
      columnHelper.accessor('action', {
        cell: info => info.getValue(),
        header: 'Action'
      })
    ],
    []
  )

  return (
    <Table
      columns={columns}
      actions={<DeviceTriggerAction title='Total Triggers' />}
      filters={<DeviceTriggerFilters />}
      data={allTrigger}
      totalElements={allTrigger.length}
      elementsPerPage={PAGE_SIZE}
      page={page}
      setPage={setPage}
    />
  )
}

export default DeviceTriggerTable
