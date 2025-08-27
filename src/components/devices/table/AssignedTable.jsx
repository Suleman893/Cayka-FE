'use client'

//React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

//Third party imports
import { createColumnHelper } from '@tanstack/react-table'
import { useSelector, useDispatch } from 'react-redux'

//Reusable Components
import Table from '@components/table/Table'
import BasicDialog from '@core/components/mui/BasicDialog'
import AssignedDeviceAction from '@components/devices/table/actions/AssignedDeviceAction'
import AssignedDeviceFilters from '@components/devices/table/filters/AssignedDeviceFilter'
import UnassignDevice from '@components/devices/dialogs/UnassignDevice'

//Icon Imports
import Online from '@assets/svg/Online'

//Redux Imports
import { allAssignedDevices } from '@redux/devices/thunk'

//Utils and Helpers Imports
import { deviceNameFormatter } from '@helpers/enumFormat'
import { snakeToPascalConverter, statusColor } from '@utils/common'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const AssignedDevicesTable = () => {
  //Next Router
  const router = useRouter()

  //Redux
  const dispatch = useDispatch()
  const { assignedDevices, isAssignedDevicesLoading, isUnassignDeviceSuccess } = useSelector(state => state.device)

  //States
  //Dialog
  const [openUnassignDeviceModal, setOpenUnassignDeviceModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  // Filter
  const [filters, setFilters] = useState({
    deviceId: '',
    brandName: '',
    deviceType: null,
    deviceStatus: null
  })

  // Pagination
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(
      allAssignedDevices({
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        deviceId: filters.deviceId,
        brandName: filters.brandName,
        deviceType: filters.deviceType,
        deviceStatus: filters.deviceStatus
      })
    )
  }, [page, isUnassignDeviceSuccess, filters.deviceType, filters.deviceStatus])

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
        cell: ({ row }) => <Typography>{row?.original?.brand?.name}</Typography>
      }),
      columnHelper.accessor('poOrder', {
        header: 'P.Order Id',
        cell: ({ row }) => <Typography>{row?.original?.brandPurchaseOrder?.poNumber}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Chip
              label={snakeToPascalConverter(row?.original?.status)}
              variant='tonal'
              color={statusColor(row?.original?.status)}
              size='small'
            />
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => router.push(`/devices/detail/${row.original.id}`)}>
              <i className='tabler-eye text-textSecondary' />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedRow(row?.original)
                setOpenUnassignDeviceModal(true)
              }}
            >
              <i className='tabler-trash text-red-500' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    []
  )

  return (
    <>
      <Table
        isLoading={isAssignedDevicesLoading}
        columns={columns}
        actions={<AssignedDeviceAction title='Devices List' />}
        filters={<AssignedDeviceFilters page={page} setPage={setPage} filters={filters} setFilters={setFilters} />}
        data={assignedDevices?.items?.length ? assignedDevices?.items : []}
        totalElements={assignedDevices?.pagination?.totalElements}
        elementsPerPage={PAGE_SIZE}
        page={page}
        setPage={setPage}
      />
      <BasicDialog
        fullWidth={false}
        content={<UnassignDevice data={selectedRow} setOpen={setOpenUnassignDeviceModal} />}
        title='Confirmation!'
        subTitle=''
        open={openUnassignDeviceModal}
        setOpen={setOpenUnassignDeviceModal}
      />
    </>
  )
}

export default AssignedDevicesTable
