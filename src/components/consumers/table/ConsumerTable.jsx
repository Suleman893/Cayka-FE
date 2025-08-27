'use client'

//React Imports
import { useState, useMemo, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

//Third party Imports
import { createColumnHelper } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'

//Reusable Components
import Table from '@components/table/Table'
import ConsumerFilter from '@components/consumers/table/ConsumerFilters'
import ConsumerActions from '@components/consumers/table/ConsumerActions'
import OptionMenu from '@core/components/option-menu'
import BasicDialog from '@core/components/mui/BasicDialog'
import ChangeStatus from '@components/consumers/detail/dialogs/ChangeStatus'

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
    name: '',
    phone: '',
    brandId: null,
    status: null
  })

  //Pagination
  const [page, setPage] = useState(currentPage)

  //Modal and Table States
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  useEffect(() => {
    dispatch(
      allConsumers({
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        brandId: filters.brandId,
        status: filters.status,
        name: filters.name,
        phone: filters.phone
      })
    )
  }, [page, isStatusChangeSuccess, filters.brandId, filters.status])

  // Column of table
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
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textPrimary'
              options={[
                {
                  text: 'View Details',
                  href: `/consumers/detail/${row.original.id}`,
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary'
                  }
                },
                {
                  text: row.original.isVerified ? 'Inactive' : 'Active',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => {
                      setSelectedRow(row?.original)
                      setOpenChangeStatusModal(true)
                    }
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    []
  )

  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Table
          isLoading={isConsumerLoading}
          actions={<ConsumerActions title='Consumer List' />}
          filters={<ConsumerFilter page={page} setPage={setPage} filters={filters} setFilters={setFilters} />}
          columns={columns}
          data={consumers?.items?.length ? consumers?.items : []}
          totalElements={consumers?.pagination?.totalElements}
          elementsPerPage={PAGE_SIZE}
          page={page}
          setPage={setPage}
        />
      </Grid>
      <BasicDialog
        fullWidth={false}
        title='Confirmation!'
        subTitle=''
        content={<ChangeStatus data={selectedRow} setOpen={setOpenChangeStatusModal} />}
        open={openChangeStatusModal}
        setOpen={setOpenChangeStatusModal}
      />
    </>
  )
}

export default ConsumerTable
