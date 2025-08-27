// React imports
import { forwardRef } from 'react'

// MUI imports
import Paper from '@mui/material/Paper'
import Autocomplete from '@mui/material/Autocomplete'

const CustomAutocomplete = forwardRef(({ disableClearable = true, ...props }, ref) => {
  return (
    // eslint-disable-next-line lines-around-comment
    <Autocomplete
      disableClearable={disableClearable}
      {...props}
      ref={ref}
      slots={{
        paper: props => <Paper {...props} />
      }}
    />
  )
})

export default CustomAutocomplete
