'use client'

// Third-party Imports
import classnames from 'classnames'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

// Component Imports
import DialogCloseButton from '@core/components/mui/DialogCloseButton'

const BasicDialog = ({ isTitleCenter = true, fullWidth, open, setOpen, title, subTitle, content }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      fullWidth={fullWidth}
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      closeAfterTransition={false}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle
        variant='h4'
        className={classnames('flex gap-2 flex-col sm:pbe-4', {
          'text-center sm:pli-16': isTitleCenter
        })}
      >
        {title}
        <Typography component='span' className='flex flex-col text-center'>
          {subTitle}
        </Typography>
      </DialogTitle>
      {content}
    </Dialog>
  )
}

export default BasicDialog
