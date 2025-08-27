// React Imports
import { useState, useMemo, useEffect } from 'react'

//Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import IconButton from '@mui/material/IconButton'
import { Chip } from '@mui/material'

//Third Party Imports
import { createColumnHelper } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'

// Components Imports
import DeviceListFilter from '@components/consumers/detail/table/DeviceListFilter'
import DeviceListAction from '@components/consumers/detail/table/DeviceListAction'
import Table from '@components/table/Table'
import DevicesDetail from '@components/consumers/detail/dialogs/DevicesDetail'
import BasicDialog from '@core/components/mui/BasicDialog'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

//Redux
import { allConsumerDevices } from '@redux/consumers/thunk'

//Utils and Helpers
import { capitalizeFirstLetter } from '@utils/common'
import { deviceNameFormatter } from '@helpers/enumFormat'

const DeviceListTable = () => {
  const [openDeviceDetail, setOpenDeviceDetail] = useState(false)
  const { isConsumerDeviceLoading, consumerDevices } = useSelector(state => state.consumer)

  const { id } = useParams()

  //Redux
  const dispatch = useDispatch()

  //States
  const [selectedRow, setSelectedRow] = useState(null)
  const [page, setPage] = useState(1)

  //Filters
  const [filters, setFilters] = useState({
    deviceId: '',
    brandId: null,
    deviceStatus: null
  })

  useEffect(() => {
    dispatch(
      allConsumerDevices({
        id,
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        deviceId: filters.deviceId,
        deviceStatus: filters.deviceStatus
      })
    )
  }, [page, filters.deviceStatus])

  // Column Definitions
  const columnHelper = createColumnHelper()

  const deviceListColumns = useMemo(() => [
    columnHelper.accessor('device.deviceType.name', {
      cell: info => info.getValue(),
      header: 'Device Type',
      cell: ({ row }) => <p>{deviceNameFormatter(row.original.device.name)}</p>
    }),
    columnHelper.accessor('device.deviceType.id', {
      cell: info => info.getValue(),
      header: 'Device Type id'
    }),
    columnHelper.accessor('device.deviceId', {
      cell: info => info.getValue(),
      header: 'Device id'
    }),
    columnHelper.accessor('device.brand.name', {
      cell: info => info.getValue(),
      header: 'Brand'
    }),
    columnHelper.accessor('trigger', {
      cell: info => info.getValue(),
      header: 'Triggers',
      cell: ({ row }) => <p>-</p>
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <Chip label={capitalizeFirstLetter(row.original.status)} variant='tonal' color='default' size='small' />
      )
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center'>
          <IconButton
            onClick={() => {
              setSelectedRow(row?.original)
              setOpenDeviceDetail(true)
            }}
          >
            <i className='tabler-eye text-textSecondary' />
          </IconButton>
        </div>
      ),
      enableSorting: false
    })
  ])

  return (
    <>
      <Table
        isLoading={isConsumerDeviceLoading}
        columns={deviceListColumns}
        actions={<DeviceListAction title='Devices List' />}
        filters={<DeviceListFilter page={page} setPage={setPage} filters={filters} setFilters={setFilters} />}
        data={consumerDevices?.items?.length ? consumerDevices?.items : []}
        totalElements={consumerDevices?.pagination?.totalElements}
        elementsPerPage={PAGE_SIZE}
        page={page}
        setPage={setPage}
      />
      <BasicDialog
        isTitleCenter={false}
        fullWidth={true}
        title='Device Details'
        subTitle=''
        content={<DevicesDetail data={selectedRow} setOpen={setOpenDeviceDetail} />}
        open={openDeviceDetail}
        setOpen={setOpenDeviceDetail}
      />
    </>
  )
}

export default DeviceListTable
