//MUI Imports
import MobileStepper from '@mui/material/MobileStepper'

export default function DotsStepper({ steps, activeStep }) {
  return (
    <MobileStepper
      variant='dots'
      steps={steps}
      position='static'
      activeStep={activeStep}
      sx={{ background: 'transparent' }}
    />
  )
}
