'use client'

//React Imports
import { useState, useMemo, useEffect } from 'react'

//React Redux Imports
import { useDispatch, useSelector } from 'react-redux'

//TanStack Imports
import { createColumnHelper } from '@tanstack/react-table'

//MUI Import
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

//Components Imports
import Table from '@components/table/Table'
import UnAssignedDeviceAction from '@components/devices/table/actions/UnAssignedDeviceAction'
import UnAssignedDeviceFilter from '@components/devices/table/filters/UnAssignedDeviceFilter'
import AssignDevice from '@components/devices/dialogs/AssignDevices'
import DeleteDevice from '@components/devices/dialogs/DeleteDevice'
import BasicDialog from '@core/components/mui/BasicDialog'

//Assets Imports
import ClipBoardCheck from '@assets/svg/ClipBoardCheck'

//Redux Import
import { allInventoryDevices } from '@redux/devices/thunk'

//Utils and Helpers Imports
import { formatTimestampToDate } from '@utils/common'
import { deviceNameFormatter } from '@helpers/enumFormat'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const UnAssignedTable = () => {
  //Redux
  const dispatch = useDispatch()
  const { inventory, isInventoryLoading, isListingUpdateSuccess } = useSelector(state => state.device)

  //States
  //Dialog
  const [openDeviceAssignmentModal, setOpenDeviceAssignmentModal] = useState(false)
  const [openDeleteDeviceModal, setOpenDeleteDeviceModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  // Filter
  const [filters, setFilters] = useState({
    deviceId: '',
    deviceType: null,
    deviceStatus: null
  })

  // Pagination
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(
      allInventoryDevices({
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        deviceId: filters.deviceId,
        deviceType: filters.deviceType,
        deviceStatus: filters.deviceStatus
      })
    )
  }, [isListingUpdateSuccess, page, filters.deviceType, filters.deviceStatus])

  // Column Definitions
  const columnHelper = createColumnHelper()

  // Column of table
  const columns = useMemo(
    () => [
      columnHelper.accessor('lotNo', {
        header: 'Lot Number',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>{row?.original?.deviceId}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('createdAt', {
        header: 'Produced Date',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>{formatTimestampToDate(row?.original?.createdAt)}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('deviceType', {
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>{deviceNameFormatter(row?.original?.deviceType?.name)}</Typography>
          </div>
        ),
        header: 'Device Type'
      }),

      columnHelper.accessor('chipsetBrand', {
        header: 'Chipset Brand',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>-</Typography>
          </div>
        )
      }),

      columnHelper.accessor('chipsetType', {
        header: 'Chipset Type',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>-</Typography>
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center cursor-pointer'>
            <IconButton onClick={() => setOpenDeviceAssignmentModal(true)}>
              <ClipBoardCheck />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedRow(row?.original)
                setOpenDeleteDeviceModal(true)
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
        isLoading={isInventoryLoading}
        actions={<UnAssignedDeviceAction title='Unassigned Device List' />}
        filters={<UnAssignedDeviceFilter page={page} setPage={setPage} filters={filters} setFilters={setFilters} />}
        columns={columns}
        data={inventory?.items?.length ? inventory?.items : []}
        totalElements={inventory?.pagination?.totalElements}
        elementsPerPage={PAGE_SIZE}
        page={page}
        setPage={setPage}
      />
      {openDeviceAssignmentModal && (
        <AssignDevice
          open={openDeviceAssignmentModal}
          setOpen={setOpenDeviceAssignmentModal}
          title='Device Assignment'
        />
      )}

      <BasicDialog
        fullWidth={false}
        content={<DeleteDevice data={selectedRow} setOpen={setOpenDeleteDeviceModal} />}
        title='Confirmation!'
        subTitle=''
        open={openDeleteDeviceModal}
        setOpen={setOpenDeleteDeviceModal}
      />
    </>
  )
}

export default UnAssignedTable
