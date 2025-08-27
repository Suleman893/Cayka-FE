'use client'

//React Imports
import { useState, useEffect, useMemo } from 'react'

//MUI Imports
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'

//Third party Imports
import { createColumnHelper } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'

//Reusable Component
import ConsumerAction from '@components/analytics/generalAnalytics/table/actions/ConsumerAction'
import ConsumerFilter from '@components/analytics/generalAnalytics/table/filters/ConsumerFilter'
import Table from '@components/table/Table'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

//Redux Import
import { allConsumers } from '@redux/consumers/thunk'

//Utils and Helpers
import { getFullName } from '@utils/common'

const ConsumerTable = () => {
  //Redux
  const dispatch = useDispatch()
  const { consumers, isConsumerLoading, isStatusChangeSuccess } = useSelector(state => state.consumer)
  const { currentPage } = useSelector(state => state.pagination)

  //States
  //Filters
  const [filters, setFilters] = useState({
    phone: '',
    brandId: null,
    status: null
  })

  //Pagination
  const [page, setPage] = useState(currentPage)

  useEffect(() => {
    dispatch(
      allConsumers({
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        brandId: filters.brandId,
        status: filters.status,
        phone: filters.phone
      })
    )
  }, [page, isStatusChangeSuccess, filters.brandId, filters.status])

  // Column Definitions
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('userName', {
        header: 'User name',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Avatar alt={row?.original?.firstName.toUpperCase()} src={row?.original?.photo} />
            <Typography>{getFullName(row?.original?.firstName, row?.original?.lastName)}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        header: 'First name'
      }),
      columnHelper.accessor('lastName', {
        header: 'Last name',
        cell: ({ row }) => <p>{row?.original?.lastName || '-'}</p>
      }),
      columnHelper.accessor('phone', {
        cell: info => info.getValue(),
        header: 'Mobile number'
      }),
      columnHelper.accessor('associatedBrands', {
        cell: info => info.getValue(),
        header: 'Brands',
        cell: ({ row }) => <p>{row?.original?.brandUser[0]?.brand?.name}</p>
      }),
      columnHelper.accessor('customerDeviceCount', {
        cell: info => info.getValue(),
        header: 'Total Devices'
      }),
      columnHelper.accessor('totalTriggers', {
        header: 'Trigger Number',
        cell: ({ row }) => <p>-</p>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row?.original?.isVerified ? 'Active' : 'Inactive'}
            variant='tonal'
            color={row?.original?.isVerified ? 'success' : 'default'}
            size='small'
          />
        )
      })
    ],
    []
  )

  return (
    <Table
      isLoading={isConsumerLoading}
      actions={<ConsumerAction title='Consumer List' />}
      filters={<ConsumerFilter page={page} setPage={setPage} filters={filters} setFilters={setFilters} />}
      columns={columns}
      data={consumers?.items?.length ? consumers?.items : []}
      totalElements={consumers?.pagination?.totalElements}
      elementsPerPage={PAGE_SIZE}
      page={page}
      setPage={setPage}
    />
  )
}

export default ConsumerTable
