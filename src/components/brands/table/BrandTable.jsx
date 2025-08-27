'use client'

//React Imports
import { useState, useMemo, useEffect } from 'react'

//MUI Imports
import Grid from '@mui/material/Grid2'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

//Third party Imports
import { createColumnHelper } from '@tanstack/react-table'
import { useSelector, useDispatch } from 'react-redux'

//Reusable Component Import
import Table from '@components/table/Table'
import OptionMenu from '@core/components/option-menu'
import BrandActions from '@components/brands/table/BrandActions'
import BrandFilters from '@components/brands/table/BrandFilters'
import ChangeStatus from '@components/brands/detail/dialogs/ChangeStatus'
import BasicDialog from '@core/components/mui/BasicDialog'

//Redux Imports
import { allBrands } from '@redux/brands/thunk'

//Utils Imports
import { formatTimestampToDate, snakeToPascalConverter, statusColor } from '@utils/common'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const BrandsTable = () => {
  //Redux
  const dispatch = useDispatch()
  const { brands, isBrandLoading, isAddBrandSuccess, isStatusChangeSuccess } = useSelector(state => state.brand)
  const { currentPage } = useSelector(state => state.pagination)

  //States
  //Filter
  const [filters, setFilters] = useState({
    brandName: '',
    brandStatus: null,
    brandCountry: null
  })

  //Pagination
  const [page, setPage] = useState(currentPage)

  //Modal and Table States
  const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  useEffect(() => {
    dispatch(
      allBrands({
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        brandName: filters?.brandName,
        brandStatus: filters?.brandStatus,
        brandCountry: filters?.brandCountry
      })
    )
  }, [page, isAddBrandSuccess, isStatusChangeSuccess, filters?.brandStatus, filters?.brandCountry])

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
                        text: row.original.status === 'inactive' ? 'Active' : 'Inactive',
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
      <Grid size={{ xs: 12 }}>
        <Table
          isLoading={isBrandLoading}
          columns={columns}
          actions={
            <BrandActions
              title='All Brand List'
              page={page}
              setPage={setPage}
              filters={filters}
              setFilters={setFilters}
            />
          }
          filters={<BrandFilters setPage={setPage} setFilters={setFilters} />}
          data={brands?.items?.length ? brands?.items : []}
          totalElements={brands?.pagination?.totalElements}
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

export default BrandsTable
