'use client'

// MUI Imports
import Card from '@mui/material/Card'

// Third-party Imports
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table'

// Component Imports
import TablePaginationComponent from '@components/table/TablePaginationComponent'
import TableLoader from '@components/commons/loaders/TableLoader'

// Icon Imports
import ChevronRight from '@menu/svg/ChevronRight'

// Style Imports
import styles from '@core/styles/table.module.css'

const Table = ({
  isLoading,
  isPaginated = true,
  columns,
  actions,
  filters,
  data,
  totalElements,
  elementsPerPage,
  page,
  setPage
}) => {
  //React table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Card>
      {/* {title && <CardHeader action={actions} />} */}
      {actions}
      <div style={{ borderTop: '1px solid #2F2B3D1F', paddingTop: '20px !important' }}>{filters}</div>
      {isLoading ? (
        <div className='h-[65vh] flex justify-center items-center'>
          <TableLoader />
        </div>
      ) : (
        <>
          <div className='overflow-x-auto'>
            <table className={styles.table}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <th key={header.id}>
                          {header.isPlaceholder ? null : (
                            <>
                              <div
                                className={classnames({
                                  'flex items-center': header.column.getIsSorted(),
                                  'cursor-pointer select-none': header.column.getCanSort()
                                })}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                  asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                                  desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                                }[header.column.getIsSorted()] ?? null}
                              </div>
                            </>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                      No record found
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table.getRowModel().rows.map(row => {
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => {
                          return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              )}
            </table>
          </div>
          {isPaginated && data.length ? (
            <TablePaginationComponent
              table={table}
              totalElements={totalElements}
              elementsPerPage={elementsPerPage}
              page={page}
              setPage={setPage}
            />
          ) : //------Not being used for now-----

          // <TablePagination
          //  component={() => (
          // <TablePaginationComponent
          // table={table}
          // totalElements={totalElements}
          // elementsPerPage={elementsPerPage}
          // page={page}
          // setPage={setPage}
          // />
          // )}
          // count={totalElements}
          // rowsPerPage={elements}
          // page={21}
          // onPageChange={(_, page) => {
          //   table.setPageIndex(page)
          // }}
          // />
          null}
        </>
      )}
    </Card>
  )
}

export default Table
