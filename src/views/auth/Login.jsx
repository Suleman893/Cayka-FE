'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useRouter, useSearchParams } from 'next/navigation'

//Image import
import Image from 'next/image'

// Third-party Imports
import classnames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'

// MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import AuthLogo from '@components/auth/AuthLogo'
import Link from '@components/Link'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

//Validation
import { loginSchema } from '@schema/auth'

//Redux
import { login } from '@redux/auth/thunk'
import { setOAuth } from '@redux/auth/slice'
import { loginDefault } from '@constants/formDefault'

// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const Login = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState(null)
  const [rememberMe, setRememberMe] = useState(false)

  const { isLoginLoading } = useSelector(state => state.auth)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()

  const paramsRefreshToken = searchParams.get('refreshToken')
  const paramsAccessToken = searchParams.get('accessToken')

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: loginDefault
  })

  const characterIllustration = useImageVariant(
    mode,
    '/images/auth/login.png',
    '/images/auth/login.png',
    borderedLightIllustration,
    borderedDarkIllustration
  )

  useEffect(() => {
    if (localStorage.getItem('email') && localStorage.getItem('password')) {
      setRememberMe(true)
      setValue('email', JSON.parse(localStorage.getItem('email')))
      setValue('password', JSON.parse(localStorage.getItem('password')))
    }
  }, [])

  useEffect(() => {
    if (paramsAccessToken && paramsRefreshToken) {
      dispatch(setOAuth({ accessToken: paramsAccessToken, refreshToken: paramsRefreshToken }))
    }
  }, [paramsAccessToken, paramsRefreshToken])

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleRememberMe = () => setRememberMe(!rememberMe)

  const onSubmit = async data => {
    const payload = {
      email: data.email,
      password: data.password
    }

    if (rememberMe) {
      localStorage.setItem('email', JSON.stringify(data.email))
      localStorage.setItem('password', JSON.stringify(data.password))
    } else {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }

    dispatch(login({ payload, router }))
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
        <LoginIllustration src={characterIllustration} alt='login' />
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-center items-center bs-full !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
          <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
            <AuthLogo />
            <div className='flex flex-col gap-1'>
              <Typography
                variant='h4'
                sx={{ fontWeight: '700' }}
              >{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
              <Typography>Please log-in to your account and start the adventure</Typography>
            </div>
            <form noValidate action={() => {}} onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    autoFocus
                    fullWidth
                    type='email'
                    placeholder='Email'
                    size='large'
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    {...((errors.email || errorState !== null) && {
                      error: true,
                      helperText: errors?.email?.message || errorState?.message[0]
                    })}
                  />
                )}
              />

              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    size='large'
                    fullWidth
                    placeholder='Password'
                    id='outlined-adornment-password'
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
                    {...(errors.password && { error: true, helperText: errors.password.message })}
                  />
                )}
              />
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel
                  control={<Checkbox checked={rememberMe} onChange={handleRememberMe} name='rememberMe' />}
                  label='Remember me'
                />
                <Typography
                  className='text-end'
                  color='primary.main'
                  component={Link}
                  href='/forgot-password'
                  fontWeight='500'
                >
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit' disabled={isLoginLoading}>
                {isLoginLoading ? <CircularProgress color='inherit' size={23} /> : 'LOG IN'}
              </Button>
              {/* <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography fontWeight='400'>New on Platform?</Typography>
                <Typography component={Link} color='primary.main' fontWeight='400'>
                  Create an account
                </Typography>
              </div> */}
              {/* <Divider className='gap-2 text-textPrimary'>or</Divider>
              <div className='flex justify-center items-center gap-5'>
                <IconButton
                  className='text-textPrimary '
                  size='small'
                  sx={{
                    border: '1px solid #DDDDDDDD',
                    borderRadius: '4px',
                    padding: '4px'
                  }}
                  onClick={() => (window.location.href = `${envConfig.API_URL}super-admin/google`)}

                  // onClick={() => googleSignin()}
                >
                  <i className='tabler-brand-google-filled' />
                </IconButton>
                <IconButton
                  className='text-textPrimary'
                  size='small'
                  sx={{
                    border: '1px solid #DDDDDDDD',
                    borderRadius: '4px',
                    padding: '4px'
                  }}
                  onClick={() => (window.location.href = `${envConfig.API_URL}/super-admin/facebook`)}
                >
                  <i className='tabler-brand-facebook-filled' />
                </IconButton>
                <IconButton
                  className='text-textPrimary'
                  size='small'
                  sx={{
                    border: '1px solid #DDDDDDDD',
                    borderRadius: '4px',
                    padding: '4px'
                  }}
                  onClick={() => (window.location.href = `${envConfig.API_URL}/super-admin/apple`)}
                >
                  <i className='tabler-brand-apple-filled' />
                </IconButton>
              </div> */}
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

export default Login
