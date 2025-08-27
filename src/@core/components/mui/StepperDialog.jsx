'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import DialogCloseButton from '@core/components/mui/DialogCloseButton'
import DotsStepper from '@core/components/mui/DotStepper'

const StepperDialog = ({
  open,
  setOpen,
  title,
  subTitle,
  content,
  activeStep,
  totalSteps,
  leftBtnTitle,
  rightBtnTitle,
  handleNext,
  handleBack,
  handleSubmit,
  isAllowSubmit,
  isSubmissionLoading = false
}) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={setOpen}
      maxWidth='md'
      scroll='body'
      closeAfterTransition={false}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={setOpen} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbe-4 sm:pli-16'>
        {title}
        <Typography component='span' className='flex flex-col text-center'>
          {subTitle}
        </Typography>
      </DialogTitle>
      <form noValidate onSubmit={handleSubmit} autoComplete='off'>
        <DialogContent className='overflow-visible pbs-0 sm:pli-6'>
          <Grid container spacing={5}>
            {content}
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center'>
          <Button variant='tonal' color='secondary' type='button' onClick={handleBack} className='w-[32%]'>
            {leftBtnTitle}
          </Button>
          {/* If submission allowed then button with type submit */}
          {isAllowSubmit ? (
            <Button variant='contained' type='submit' className='w-[32%]' disabled={isSubmissionLoading}>
              {isSubmissionLoading ? <CircularProgress color='inherit' size={23} /> : rightBtnTitle}
            </Button>
          ) : (
            <Button variant='contained' onClick={handleNext} type='button' className='w-[32%]'>
              {rightBtnTitle}
            </Button>
          )}
        </DialogActions>
        <DialogActions className='justify-center pt-0 pr-0 pl-0 pb-5'>
          <DotsStepper steps={totalSteps} activeStep={activeStep} />
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default StepperDialog
