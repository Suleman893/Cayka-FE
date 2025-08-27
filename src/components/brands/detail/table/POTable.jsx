// React Imports
import { useState, useEffect, useMemo } from 'react'

//Next Imports
import { useParams } from 'next/navigation'

//React Redux Imports
import { useDispatch, useSelector } from 'react-redux'

//Third party imports
import { createColumnHelper } from '@tanstack/react-table'

//MUI Imports
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

//Reusable Components
import Table from '@components/table/Table'
import BrandDetailActions from '@components/brands/detail/table/actions/PurchaseOrderActions'
import BasicDialog from '@core/components/mui/BasicDialog'
import DeletePurchaseOrder from '@components/brands/detail/dialogs/DeletePurchaseOrder'
import AddInvoiceId from '@components/brands/detail/dialogs/AddInvoiceId'
import PODevicesTable from '@components/brands/detail/dialogs/PODevicesTable'

//Icon Imports
import Receipt from '@menu/svg/Receipt'

//Utils Imports
import { formatTimestampToDate } from '@utils/common'

//Redux Imports
import { allPurchaseOrders } from '@redux/brands/thunk'

//Constants Imports
import { PAGE_SIZE, SORT_BY } from '@constants/common'

const POTable = () => {
  //Table Selected Row
  const [selectedRow, setSelectedRow] = useState(null)

  //Modal States
  const [openUploadPOModal, setOpenUploadPOModal] = useState(false)
  const [openAddInvoiceModal, setOpenAddInvoiceModal] = useState(false)
  const [openDeletePOModal, setOpenDeletePOModal] = useState(false)
  const [openDevicesModal, setOpenDevicesModal] = useState(false)

  const { brandDetail, purchaseOrders, isPOLoading, isDeletePOSuccess, isAddPOSuccess, isAddInvoiceSuccess } =
    useSelector(state => state.brand)

  const { id } = useParams()

  //Redux
  const dispatch = useDispatch()

  // Pagination
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(allPurchaseOrders({ id: id, page, elements: PAGE_SIZE, sortBy: SORT_BY }))
  }, [page, isAddPOSuccess, isAddInvoiceSuccess, isDeletePOSuccess])

  // Column of table
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('poNumber', {
        cell: info => info.getValue(),
        header: 'P.O Number'
      }),
      columnHelper.accessor('totalDevices', {
        cell: info => info.getValue(),
        header: 'Total devices'
      }),
      columnHelper.accessor('bill', {
        cell: info => info.getValue(),
        header: 'Bill'
      }),
      columnHelper.accessor('issueDate', {
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography>{formatTimestampToDate(row?.original?.issueDate)}</Typography>
          </div>
        ),
        header: 'Issued Date'
      }),
      columnHelper.accessor('invoiceId', {
        header: 'Invoice Id',
        cell: ({ row }) =>
          row.original.invoiceId ? (
            <p>{row.original.invoiceId}</p>
          ) : (
            <div
              className='flex items-center cursor-pointer'
              onClick={() => {
                setSelectedRow(row?.original)
                setOpenAddInvoiceModal(true)
              }}
            >
              <Receipt />
            </div>
          ),
        enableSorting: false
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            {row?.original?.invoiceId || row?.original?.totalDevices ? (
              <IconButton
                onClick={() => {
                  setSelectedRow(row?.original)
                  setOpenDevicesModal(true)
                }}
              >
                <i className='tabler-eye text-textSecondary' />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  setSelectedRow(row?.original)
                  setOpenDeletePOModal(true)
                }}
              >
                <i className='tabler-trash text-red-500' />
              </IconButton>
            )}
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
        isLoading={isPOLoading}
        columns={columns}
        actions={<BrandDetailActions title='Purchase Order List' data={brandDetail} setOpen={setOpenUploadPOModal} />}
        data={purchaseOrders?.items?.length ? purchaseOrders?.items : []}
        totalElements={purchaseOrders?.pagination?.totalElements}
        elementsPerPage={PAGE_SIZE}
        page={page}
        setPage={setPage}
      />
      <BasicDialog
        fullWidth={true}
        title='Add Invoice ID'
        subTitle=''
        content={<AddInvoiceId data={selectedRow} setOpen={setOpenAddInvoiceModal} />}
        open={openAddInvoiceModal}
        setOpen={setOpenAddInvoiceModal}
      />
      <BasicDialog
        fullWidth={false}
        content={<DeletePurchaseOrder data={selectedRow} setOpen={setOpenDeletePOModal} />}
        title='Confirmation!'
        subTitle=''
        open={openDeletePOModal}
        setOpen={setOpenDeletePOModal}
      />
      <BasicDialog
        isTable={true}
        fullWidth={true}
        content={<PODevicesTable data={selectedRow} />}
        title={`Purchase Order Number: ${selectedRow?.poNumber}`}
        subTitle=''
        open={openDevicesModal}
        setOpen={setOpenDevicesModal}
      />
    </>
  )
}

export default POTable
