'use client'

//React Imports
import { useState, useEffect, useMemo } from 'react'

//MUI Imports
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

//Third-Party Imports
import { createColumnHelper } from '@tanstack/react-table'
import { useSelector, useDispatch } from 'react-redux'

//Icon Imports
import Online from '@assets/svg/Online'

//Redux Imports
import { allDevices } from '@redux/analytics/thunk'

//Reusable Component
import Table from '@components/table/Table'
import ActiveDeviceFilters from '@components/analytics/generalAnalytics/table/filters/ActiveDeviceFilter'
import ActiveDevicesAction from '@components/analytics/generalAnalytics/table/actions/ActiveDeviceAction'

//Utils and Helpers Imports
import { deviceNameFormatter } from '@helpers/enumFormat'
import { snakeToPascalConverter, statusColor } from '@utils/common'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const ActiveDevicesTable = () => {
  //Redux
  const dispatch = useDispatch()
  const { devices, isLoading } = useSelector(state => state.analytics)

  //States
  // Filter
  const [filters, setFilters] = useState({
    deviceStatus: 'online',
    brandId: null,
    deviceType: null
  })

  //Pagination
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(
      allDevices({
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        brandId: filters.brandId,
        deviceType: filters.deviceType
      })
    )
  }, [page, filters.brandId, filters.deviceType])

  // Column Definitions
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('deviceType', {
        header: 'Device Type',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Typography>{deviceNameFormatter(row?.original?.deviceType?.name)}</Typography>
            {row?.original?.status === 'online' && <Online />}
          </div>
        )
      }),
      columnHelper.accessor('deviceTypeId', {
        header: 'Device Type Id',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Typography>{row?.original?.deviceType?.id}</Typography>
            {/* {row?.original?.status === 'Online' && <Online />} */}
          </div>
        )
      }),
      columnHelper.accessor('deviceId', {
        cell: info => info.getValue(),
        header: 'Device Id'
      }),
      columnHelper.accessor('brandName', {
        header: 'Brand Name',
        cell: ({ row }) => <Typography>{row?.original?.brand?.name || '-'}</Typography>
      }),
      columnHelper.accessor('poOrder', {
        header: 'P.O Number',
        cell: ({ row }) => <Typography>{row?.original?.brandPurchaseOrder?.poNumber || '-'}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={snakeToPascalConverter(row?.original?.status)}
            variant='tonal'
            color={statusColor(row?.original?.status)}
            size='small'
          />
        )
      })
    ],
    []
  )

  return (
    <Table
      isLoading={isLoading}
      columns={columns}
      actions={<ActiveDevicesAction title='Active Devices List' />}
      filters={<ActiveDeviceFilters setPage={setPage} setFilters={setFilters} />}
      data={devices?.items?.length ? devices?.items : []}
      totalElements={devices?.pagination?.totalElements}
      elementsPerPage={PAGE_SIZE}
      page={page}
      setPage={setPage}
    />
  )
}

export default ActiveDevicesTable
