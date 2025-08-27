'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'

const StatusChange = ({ title, switchTitle, defaultChecked, checked, handleChange, tooltipProps, disabled }) => {
  const renderSwitch = (
    <Switch disabled={disabled} defaultValue={defaultChecked} checked={checked} onChange={handleChange} />
  )

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <Typography variant='h5'>{title}</Typography>
          <Divider />
          <div className='flex items-center justify-between gap-4'>
            <Typography>{switchTitle}</Typography>
            {tooltipProps?.title && tooltipProps?.condition ? (
              <Tooltip
                title={tooltipProps.title}
                placement='top-start'
                arrow
                disableHoverListener={!tooltipProps.condition}
              >
                <span>{renderSwitch}</span>
              </Tooltip>
            ) : (
              renderSwitch
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatusChange
