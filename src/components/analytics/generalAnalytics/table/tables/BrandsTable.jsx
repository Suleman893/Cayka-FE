'use client'

//React Imports
import { useState, useMemo, useEffect } from 'react'

//MUI Imports
import Chip from '@mui/material/Chip'

//Third-Party Imports
import { createColumnHelper } from '@tanstack/react-table'
import { useSelector, useDispatch } from 'react-redux'

//Reusable Component
import Table from '@components/table/Table'
import BrandFilter from '@components/analytics/generalAnalytics/table/filters/BrandFilter'
import BrandAction from '@components/analytics/generalAnalytics/table/actions/BrandAction'

//Redux Imports
import { allBrands } from '@redux/brands/thunk'

//Utils Imports
import { snakeToPascalConverter, statusColor } from '@utils/common'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const BrandsTable = () => {
  //Redux
  const dispatch = useDispatch()
  const { brands, isBrandLoading } = useSelector(state => state.brand)
  const { currentPage } = useSelector(state => state.pagination)

  //States
  //Filter
  const [filters, setFilters] = useState({
    brandName: ''
  })

  //Pagination
  const [page, setPage] = useState(currentPage)

  useEffect(() => {
    dispatch(
      allBrands({
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        brandName: filters?.brandName
      })
    )
  }, [page])

  // Column Definitions
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        cell: info => info.getValue(),
        header: 'Brand Name'
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
      columnHelper.accessor('devicesCount', {
        cell: info => info.getValue(),
        header: 'Total Devices'
      }),
      columnHelper.accessor('onlineDevicesCount', {
        cell: info => info.getValue(),
        header: 'Active Devices'
      }),
      columnHelper.accessor('usersCount', {
        cell: info => info.getValue(),
        header: 'Users'
      })
    ],
    []
  )

  return (
    <Table
      isLoading={isBrandLoading}
      columns={columns}
      actions={<BrandAction title='Brand List' />}
      filters={<BrandFilter page={page} filters={filters} setPage={setPage} setFilters={setFilters} />}
      data={brands?.items?.length ? brands?.items : []}
      totalElements={brands?.pagination?.totalElements}
      elementsPerPage={PAGE_SIZE}
      page={page}
      setPage={setPage}
    />
  )
}

export default BrandsTable
