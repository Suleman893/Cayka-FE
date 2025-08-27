'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'

//MUI Imports
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'
import AuthLogo from '@components/auth/AuthLogo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

//Validation
import { resetPassSchema } from '@schema/auth'

//Redux
import { resetPassword } from '@redux/auth/thunk'

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

const ResetPassword = ({ mode }) => {
  const searchParams = useSearchParams()

  const resetToken = searchParams.get('token')

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState(null)

  const { isResetPassLoading } = useSelector(state => state.auth)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-forgot-password-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-forgot-password-light.png'

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(resetPassSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: ''
    }
  })

  // Hooks
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    '/images/auth/forgot-reset-pass.png',
    '/images/auth/forgot-reset-pass.png'
  )

  const dispatch = useDispatch()
  const router = useRouter()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const onSubmit = async data => {
    const payload = {
      newPassword: data.newPassword,
      token: resetToken
    }

    dispatch(resetPassword({ payload, router }))
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
        <ForgotPasswordIllustration src={characterIllustration} alt='reset-pass' />
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-center items-center bs-full !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
          <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
            <AuthLogo />
            <div className='flex flex-col gap-1'>
              <Typography variant='h4'>Reset Password 🔒</Typography>
              <Typography>Your new password must be different from previously used passwords</Typography>
            </div>
            <form noValidate onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
              <Controller
                name='newPassword'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    autoFocus
                    fullWidth
                    placeholder='New Password'
                    size='large'
                    type={isPasswordShown ? 'text' : 'password'}
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end' sx={{ fontSize: '18px' }}>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={isPasswordShown ? 'tabler-eye-off h-6 w-6' : 'tabler-eye h-6 w-6'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                    {...((errors.newPassword || errorState !== null) && {
                      error: true,
                      helperText: errors?.newPassword?.message || errorState?.message[0]
                    })}
                  />
                )}
              />

              <Controller
                name='confirmNewPassword'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    placeholder='Confirm Password'
                    id='outlined-adornment-password'
                    size='large'
                    type={isConfirmPasswordShown ? 'text' : 'password'}
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end' sx={{ fontSize: '18px' }}>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={isConfirmPasswordShown ? 'tabler-eye-off h-6 w-6' : 'tabler-eye h-6 w-6'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                    {...((errors.confirmNewPassword || errorState !== null) && {
                      error: true,
                      helperText: errors?.confirmNewPassword?.message || errorState?.message[0]
                    })}
                  />
                )}
              />
              <Button fullWidth variant='contained' type='submit' disabled={isResetPassLoading}>
                {isResetPassLoading ? <CircularProgress color='inherit' size={23} /> : 'SEND LINK'}
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

export default ResetPassword
