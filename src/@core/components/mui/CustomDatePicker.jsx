import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const CustomDatePicker = ({ label, children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label={label}>{children}</DemoItem>
    </LocalizationProvider>
  )
}

export default CustomDatePicker
