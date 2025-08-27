// React Imports
import { useState, useMemo, useEffect } from 'react'

//Third Party Imports
import { createColumnHelper } from '@tanstack/react-table'
import { useSelector, useDispatch } from 'react-redux'

// MUI Imports
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

//Reusable Components
import OptionMenu from '@core/components/option-menu'
import Table from '@components/table/Table'
import ChangeStatus from '@components/brands/detail/dialogs/ChangeStatus'
import BasicDialog from '@core/components/mui/BasicDialog'
import DashboardAction from '@components/dashboard/table/DashboardActions'

//Redux Imports
import { allBrands } from '@redux/brands/thunk'

//Utils Imports
import { formatTimestampToDate, snakeToPascalConverter, statusColor } from '@utils/common'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const DashboardTable = () => {
  //Redux
  const dispatch = useDispatch()

  const { brands, isBrandLoading, isAddBrandSuccess, isStatusChangeSuccess } = useSelector(state => state.brand)

  //Pagination
  const page = 1

  useEffect(() => {
    dispatch(
      allBrands({
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY
      })
    )
  }, [isAddBrandSuccess, isStatusChangeSuccess])

  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  // Column of table
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        cell: info => info.getValue(),
        header: 'Brand Name'
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>{row?.original?.user?.country}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('licenseExp', {
        header: 'License Exp',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>{formatTimestampToDate(row?.original?.brandLicense?.endDate)}</Typography>
          </div>
        )
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
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'View Details',
                  href: `/brands/detail/${row.original.id}`,
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                ...(row.original.status !== 'pending'
                  ? [
                      {
                        text: row.original.status === 'inactive' ? 'Active' : 'InActive',
                        menuItemProps: {
                          className: 'flex items-center gap-2 text-textSecondary',
                          onClick: () => {
                            setSelectedRow(row?.original)
                            setOpenChangeStatusModal(true)
                          }
                        }
                      }
                    ]
                  : [])
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
      <Table
        isLoading={isBrandLoading}
        isPaginated={false}
        columns={columns}
        actions={<DashboardAction title='Recently Added Brands' />}
        data={brands?.items?.length ? brands?.items : []}
      />
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

export default DashboardTable
