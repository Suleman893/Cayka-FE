'use client'

// React Imports
import { useState, useEffect } from 'react'

//Third-party Imports
import { useWatch, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSessionStorage } from 'react-use'

// Component Imports
import StepperDialog from '@core/components/mui/StepperDialog'
import AddBrand from '@components/brands/dialogs/AddBrand'
import AddLicenseDate from '@components/brands/dialogs/AddLicenseDate'
import AddKeyGenerated from '@components/brands/dialogs/AddKeyGenerated'

//Constants Imports
import { addNewBrandDefault } from '@constants/formDefault'

//Validations Schema Imports
import { brandSchema } from '@schema/brand'

//Redux Imports
import { addBrand } from '@redux/brands/thunk'

const AddNewBrand = ({ open, setOpen }) => {
  //Redux
  const dispatch = useDispatch()
  const { isAddBrandLoading } = useSelector(state => state.brand)

  // States for Stepper Modal
  const [activeStep, setActiveStep] = useState(0)
  const [currentContent, setCurrentContent] = useState(<AddBrand />)
  const [dialogTitle, setDialogTitle] = useState('Add new brand')
  const [dialogSubTitle, setDialogSubTitle] = useState('')
  const [leftBtnTitle, setLeftBtnTitle] = useState('Cancel')
  const [rightBtnTitle, setRightBtnTitle] = useState('')
  const [error, setError] = useState(false)
  const [isAllowSubmit, setIsAllowSubmit] = useState(false)

  //For country phone number dial code
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1')
  const [sessionStoredKey, setSessionStoredKey] = useSessionStorage('licenseKey', null)

  //React hook form states
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm({
    resolver: yupResolver(brandSchema),
    defaultValues: addNewBrandDefault
  })

  const serverTypeValue = useWatch({
    control,
    name: 'serverType'
  })

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        setCurrentContent(
          <AddBrand
            setSelectedCountryCode={setSelectedCountryCode}
            control={control}
            errors={errors}
            serverTypeValue={serverTypeValue}
          />
        )
        setDialogTitle('Add New Brand')
        setDialogSubTitle('')
        setRightBtnTitle('Next')
        setLeftBtnTitle('Cancel')
        setIsAllowSubmit(false)
        break
      case 1:
        setCurrentContent(<AddLicenseDate control={control} errors={errors} />)
        setDialogTitle('Add License Date')
        setDialogSubTitle('')
        setRightBtnTitle('Next')
        setLeftBtnTitle('Previous')
        setIsAllowSubmit(false)
        break
      case 2:
        setCurrentContent(
          <AddKeyGenerated
            setValue={setValue}
            setSessionStoredKey={setSessionStoredKey}
            sessionStoredKey={sessionStoredKey}
          />
        )
        setDialogTitle('Key Generated')
        setDialogSubTitle(`Brand's License Key has been generated successfully.`)
        setRightBtnTitle('Finish Setup')
        setLeftBtnTitle('Previous')
        setIsAllowSubmit(true)
        break
      default:
        setCurrentContent(
          <AddBrand setSelectedCountryCode={setSelectedCountryCode} control={control} errors={errors} />
        )
        setDialogTitle('Add new brand')
        setDialogSubTitle('')
        setIsAllowSubmit(false)
    }
  }

  useEffect(() => {
    renderForm()
  }, [activeStep, error, selectedCountryCode, serverTypeValue])

  //Navigate to next screen
  const handleNext = async () => {
    if (activeStep === 0) {
      const firstStepTrigger = await trigger([
        'name',
        'address',
        'country',
        'firstName',
        'email',
        'phone',
        'notes',
        'serverType'
      ])

      if (firstStepTrigger === true) {
        //First Step returns no errors then move to next form
        setActiveStep(prevActiveStep => prevActiveStep + 1)
      } else setError(!error)
    }

    if (activeStep === 1) {
      const secondStepTrigger = await trigger(['startDate', 'endDate'])

      if (secondStepTrigger === true) {
        //Second Step returns no errors move to next form
        setActiveStep(prevActiveStep => prevActiveStep + 1)
      } else setError(!error)
    }
  }

  const handleClose = () => {
    sessionStorage.removeItem('licenseKey')
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
      addBrand({
        selectedCountryCode,
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
        isSubmissionLoading={isAddBrandLoading}
      />
    </div>
  )
}

export default AddNewBrand
