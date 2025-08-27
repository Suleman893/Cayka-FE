'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import classnames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useDispatch, useSelector } from 'react-redux'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'
import AuthLogo from '@components/auth/AuthLogo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

//Validation
import { forgotPassSchema } from '@schema/auth'

//Redux
import { forgotPassword } from '@redux/auth/thunk'

// Styled Custom Components
const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 650,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const ForgotPassword = ({ mode }) => {
  const [errorState, setErrorState] = useState(null)
  const { isForgotPassLoading } = useSelector(state => state.auth)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-forgot-password-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-forgot-password-light.png'

  // Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(forgotPassSchema),
    defaultValues: {
      email: ''
    }
  })

  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    '/images/auth/forgot-reset-pass.png',
    '/images/auth/forgot-reset-pass.png'
  )

  const onSubmit = async data => {
    const payload = {
      email: data.email
    }

    dispatch(forgotPassword({ payload, router }))
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
        style={{
          background: 'linear-gradient(to right, #FFFFFF, #6399B6)'
        }}
      >
        <ForgotPasswordIllustration src={characterIllustration} alt='forgot-password' />
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-center items-center bs-full !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
          <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
            <AuthLogo />
            <div className='flex flex-col gap-1'>
              <Typography variant='h4'>Forgot Password 🔒</Typography>
              <Typography>
                Please enter the email you used to create a Cayka account, we’ll send you a link to reset your password.
              </Typography>
            </div>
            <form noValidate onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type='email'
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    {...((errors.email || errorState !== null) && {
                      error: true,
                      helperText: errors?.email?.message || errorState?.message[0]
                    })}
                    autoFocus
                    fullWidth
                    placeholder='Email'
                    size='large'
                  />
                )}
              />

              <Button fullWidth variant='contained' type='submit' disabled={isForgotPassLoading}>
                {isForgotPassLoading ? <CircularProgress color='inherit' size={23} /> : 'SEND LINK'}
              </Button>
              <Typography className='flex justify-center items-center' color='primary.main'>
                <Link href='/login' className='flex items-center gap-1.5'>
                  <DirectionalIcon
                    ltrIconClass='tabler-chevron-left'
                    rtlIconClass='tabler-chevron-right'
                    className='text-xl'
                  />
                  <span>Back to login</span>
                </Link>
              </Typography>
            </form>
          </div>
        </div>
        <div className='mx-auto mb-6'>
          <Typography>©Cayka2024</Typography>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
