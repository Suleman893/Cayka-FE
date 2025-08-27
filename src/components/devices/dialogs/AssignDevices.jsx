'use client'

//React Imports
import { useState, useEffect } from 'react'

//Third-party Imports
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

// Component Imports
import StepperDialog from '@core/components/mui/StepperDialog'
import DeviceAssignment from '@components/devices/dialogs/DeviceAssignment'
import AddInvoiceId from '@components/devices/dialogs/AddInvoiceId'
import AssignModule from '@components/devices/dialogs/AssignModule'

//Constants Imports
import { assignDeviceDefault } from '@constants/formDefault'

//Validations Schema Imports
import { assignDeviceSchema } from '@schema/device'

//Redux Imports
import { assignDevicesToBrand } from '@redux/devices/thunk'

const AssignDevice = ({ open, setOpen }) => {
  //Redux
  const dispatch = useDispatch()
  const { isAssignDeviceLoading } = useSelector(state => state.device)

  //States
  const [activeStep, setActiveStep] = useState(0)
  const [currentContent, setCurrentContent] = useState(<DeviceAssignment />)
  const [dialogTitle, setDialogTitle] = useState('Device Assignment')
  const [dialogSubTitle, setDialogSubTitle] = useState('')
  const [leftBtnTitle, setLeftBtnTitle] = useState('Cancel')
  const [rightBtnTitle, setRightBtnTitle] = useState('')
  const [error, setError] = useState(false)
  const [isAllowSubmit, setIsAllowSubmit] = useState(false)

  //React hook form states
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger
  } = useForm({
    resolver: yupResolver(assignDeviceSchema),
    defaultValues: assignDeviceDefault
  })

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        setCurrentContent(<DeviceAssignment control={control} errors={errors} setValue={setValue} />)
        setDialogTitle('Device Assignment')
        setDialogSubTitle('')
        setRightBtnTitle('Next')
        setLeftBtnTitle('Cancel')
        setIsAllowSubmit(false)
        break
      case 1:
        setCurrentContent(<AddInvoiceId control={control} errors={errors} getValues={getValues} />)
        setDialogTitle('Add Invoice Id')
        setDialogSubTitle('')
        setRightBtnTitle('Next')
        setLeftBtnTitle('Previous')
        setIsAllowSubmit(false)
        break
      case 2:
        setCurrentContent(<AssignModule getValues={getValues} />)
        setDialogTitle('Confirmation')
        setDialogSubTitle('')
        setRightBtnTitle('Save')
        setLeftBtnTitle('Previous')
        setIsAllowSubmit(true)
        break
      default:
        setCurrentContent(<DeviceAssignment control={control} errors={errors} />)
        setDialogTitle('Device Assignment')
        setDialogSubTitle('')
        setIsAllowSubmit(false)
    }
  }

  useEffect(() => {
    renderForm()
  }, [activeStep, error])

  //Navigate to next screen
  const handleNext = async () => {
    if (activeStep === 0) {
      const firstStepTrigger = await trigger(['brand', 'brandPurchaseOrder', 'devices'])

      if (firstStepTrigger === true) {
        //First Step returns no errors then move to next form
        setActiveStep(prevActiveStep => prevActiveStep + 1)
      } else setError(!error)
    }

    if (activeStep === 1) {
      const secondStepTrigger = await trigger(['invoiceId'])

      if (secondStepTrigger === true) {
        //Second Step returns no errors move to next form
        setActiveStep(prevActiveStep => prevActiveStep + 1)
      } else setError(!error)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  //Navigate to previous screen
  const handleBack = () => {
    if (activeStep === 0) {
      handleClose()
    }

    if (activeStep > 0) {
      //If second form then click on Previous will move to previous form
      setActiveStep(prevActiveStep => prevActiveStep - 1)
    }
  }

  const onSubmit = async data => {
    dispatch(
      assignDevicesToBrand({
        data,
        handleClose
      })
    )
  }

  return (
    <div className='flex justify-center'>
      <StepperDialog
        open={open}
        setOpen={handleClose}
        title={dialogTitle}
        subTitle={dialogSubTitle}
        content={currentContent}
        activeStep={activeStep}
        totalSteps={3}
        leftBtnTitle={leftBtnTitle}
        rightBtnTitle={rightBtnTitle}
        handleNext={handleNext}
        handleBack={handleBack}
        handleSubmit={handleSubmit(onSubmit)}
        isAllowSubmit={isAllowSubmit}
        isSubmissionLoading={isAssignDeviceLoading}
      />
    </div>
  )
}

export default AssignDevice
