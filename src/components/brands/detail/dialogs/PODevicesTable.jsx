'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'

//React Redux Imports
import { useDispatch, useSelector } from 'react-redux'

//TanStack Imports
import { createColumnHelper } from '@tanstack/react-table'

//Components Imports
import Table from '@components/table/Table'
import PurchaseOrderHeader from '@components/brands/detail/table/header/PurchaseOrderHeader'

//Redux Import
import { allPODevices } from '@redux/brands/thunk'

//Helper Imports
import { deviceNameFormatter } from '@helpers/enumFormat'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const PODevicesTable = ({ data }) => {
  //Redux
  const dispatch = useDispatch()

  const { PODevices, isPODevicesLoading } = useSelector(state => state.brand)

  // Pagination
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(allPODevices({ id: data?.id, page, elements: PAGE_SIZE, sortBy: SORT_BY }))
  }, [page])

  // Column Definitions
  const columnHelper = createColumnHelper()

  // Column of table
  const columns = useMemo(
    () => [
      columnHelper.accessor('deviceType', {
        header: 'Device Type',
        cell: ({ row }) => <Typography>{deviceNameFormatter(row?.original?.deviceType?.name)}</Typography>
      }),
      columnHelper.accessor('deviceId', {
        cell: info => info.getValue(),
        header: 'Device Id (Unique)'
      }),
      columnHelper.accessor('deviceTypeId', {
        cell: ({ row }) => <Typography>{row?.original?.deviceType?.id}</Typography>,
        header: 'Device Type Id'
      })
    ],
    []
  )

  return (
    <Table
      isLoading={isPODevicesLoading}
      columns={columns}
      actions={null}
      filters={<PurchaseOrderHeader data={data} />}
      data={PODevices?.items?.length ? PODevices?.items : []}
      totalElements={PODevices?.pagination?.totalElements}
      elementsPerPage={PAGE_SIZE}
      page={page}
      setPage={setPage}
    />
  )
}

export default PODevicesTable
