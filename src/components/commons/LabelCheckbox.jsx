'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const LabelCheckbox = ({ label, onSelectAll }) => {
  const [selectAll, setSelectAll] = useState(false)

  const handleSelectAll = event => {
    setSelectAll(event.target?.checked)
    onSelectAll(event.target.checked)
  }

  return (
    <div className='flex justify-between items-center w-full pr-4'>
      <span>{label}</span>
      <FormControlLabel
        control={<Checkbox size='small' checked={selectAll} onChange={handleSelectAll} />}
        label='Select All'
        labelPlacement='end'
        sx={{
          margin: 0,
          '& .MuiFormControlLabel-label': {
            fontSize: '0.8rem'
          }
        }}
        className='text-xs'
      />
    </div>
  )
}

export default LabelCheckbox
