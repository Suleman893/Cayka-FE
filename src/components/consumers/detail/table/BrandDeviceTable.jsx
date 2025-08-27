// React Imports
import { useState, useMemo, useEffect } from 'react'

//Third-Party Imports
import { createColumnHelper } from '@tanstack/react-table'

//Reusable Components Imports
import Table from '@components/table/Table'
import BrandDeviceAction from '@components/consumers/detail/table/BrandDeviceAction'

const BrandDeviceTable = ({ consumerDetail }) => {
  const [brandsDevices, setBrandsDevice] = useState([])

  useEffect(() => {
    setBrandsDevice([
      {
        id: consumerDetail?.id,
        brand: consumerDetail?.brandUser[0]?.brand?.name,
        totalDevices: consumerDetail?.totalDevices || 0
      }
    ])
  }, [consumerDetail?.id])

  // Column Definitions
  const columnHelper = createColumnHelper()

  // Column of table
  const columns = useMemo(
    () => [
      columnHelper.accessor('brand', {
        cell: info => info.getValue(),
        header: 'Brand'
      }),
      columnHelper.accessor('totalDevices', {
        cell: info => info.getValue(),
        header: 'Total Devices'
      })
    ],
    []
  )

  return (
    <Table
      columns={columns}
      actions={<BrandDeviceAction title='Brand Association' />}
      data={brandsDevices.length ? brandsDevices : []}
      isPaginated={false}
    />
  )
}

export default BrandDeviceTable
