'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { Chip } from '@mui/material'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'
import { createColumnHelper } from '@tanstack/react-table'

// Components Imports
import BasicDialog from '@core/components/mui/BasicDialog'
import OptionMenu from '@core/components/option-menu'
import Table from '@components/table/Table'
import LicenseManagementFilter from '@components/license-management/table/LicenseManagementFilters'
import LicenseManagementActions from '@components/license-management/table/LicenseManagementActions'
import RenewLicense from '@components/license-management/dialogs/RenewLicense'
import RevokeLicense from '@components/license-management/dialogs/RevokeLicense'

// Redux Imports
import { allLicenses } from '@redux/license/thunk'

// Utils and Helpers Imports
import { formatTimestampToDate, snakeToPascalConverter, statusColor } from '@utils/common'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const LicenseManagementTable = () => {
  // Redux
  const dispatch = useDispatch()

  const { licenses, isLoading, isRenewSuccess } = useSelector(state => state.license)

  //States
  // Filter
  const [filters, setFilters] = useState({
    brandId: null,
    brandAdminId: null,
    licenseStatus: null,
    licenseKey: ''
  })

  // Modals
  const [openRenewLicense, setOpenRenewLicense] = useState(false)
  const [openRevokeLicense, setOpenRevokeLicense] = useState(false)

  // Selected Table Row
  const [currentRow, setCurrentRow] = useState(null)

  // Pagination
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(
      allLicenses({
        page,
        elements: PAGE_SIZE,
        sortBy: SORT_BY,
        brandId: filters.brandId,
        brandAdminId: filters.brandAdminId,
        licenseKey: filters.licenseKey,
        licenseStatus: filters.licenseStatus
      })
    )
  }, [page, isRenewSuccess, filters.brandId, filters.brandAdminId, filters.licenseStatus])

  // Column of table
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('brandOwner', {
        header: 'Brand Owner ',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Avatar
              alt={row?.original?.brand?.user?.firstName}
              src={row?.original?.brand?.user?.photo || row?.original?.brand?.user?.firstName}
            />
            <Typography>{row?.original?.brand?.user?.firstName}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('email', {
        header: 'Email Address',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>{row?.original?.brand?.user?.email}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('brand', {
        header: 'Brands',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>{row?.original?.brand?.name}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('licenseKey', {
        header: 'License Key',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('endDate', {
        header: 'License Expiry Date',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>{formatTimestampToDate(row?.original?.endDate)}</Typography>
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
                  text: 'Renew License',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => {
                      setOpenRenewLicense(true)
                      setCurrentRow(row?.original)
                    }
                  }
                },
                {
                  text: 'Revoke License',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => {
                      setOpenRevokeLicense(true)
                      setCurrentRow(row?.original)
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
          isLoading={isLoading}
          columns={columns}
          actions={<LicenseManagementActions title='License Management' />}
          filters={<LicenseManagementFilter page={page} setPage={setPage} filters={filters} setFilters={setFilters} />}
          data={licenses?.items?.length ? licenses?.items : []}
          totalElements={licenses?.pagination?.totalElements}
          elementsPerPage={PAGE_SIZE}
          page={page}
          setPage={setPage}
        />
      </Grid>
      <BasicDialog
        fullWidth={true}
        content={<RenewLicense currentRow={currentRow} setOpen={setOpenRenewLicense} />}
        title={`Renew License for ${currentRow?.brand?.user?.firstName}`}
        subTitle=''
        open={openRenewLicense}
        setOpen={setOpenRenewLicense}
      />
      <BasicDialog
        fullWidth={true}
        content={<RevokeLicense currentRow={currentRow} setOpen={setOpenRevokeLicense} />}
        title={`Revoke License for ${currentRow?.brand?.user?.firstName}`}
        subTitle=''
        open={openRevokeLicense}
        setOpen={setOpenRevokeLicense}
      />
    </>
  )
}

export default LicenseManagementTable
