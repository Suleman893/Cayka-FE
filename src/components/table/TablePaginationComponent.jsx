// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

//Redux Imports
import { useDispatch } from 'react-redux'

import { setCurrentPage } from '@redux/pagination/slice'

const TablePaginationComponent = ({ table, totalElements, elementsPerPage, page, setPage }) => {
  const dispatch = useDispatch()

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography>
        {`Showing ${
          totalElements === 0 ? 0 : (page - 1) * elementsPerPage + 1
        } to ${Math.min(page * elementsPerPage, totalElements)} of ${totalElements} entries`}
      </Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={Math.ceil(totalElements / elementsPerPage)}
        page={page}
        onChange={(_, page) => {
          dispatch(setCurrentPage(page))
          setPage(page)
        }}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
