'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

//Redux Import
import { useDispatch, useSelector } from 'react-redux'

//Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

//Schema Import
import { changePasswordSchema } from '@schema/user'

//Redux Import
import { changePassword } from '@redux/user/thunk'

const ChangePassword = () => {
  //Redux
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.user)

  // States
  const [isCurrentPassShown, setIsCurrentPassShown] = useState(false)
  const [isNewPassShown, setIsNewPassShown] = useState(false)
  const [isConfirmPassShown, setIsConfirmPassShown] = useState(false)

  //Hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const onSubmit = data => {
    dispatch(changePassword({ data, reset }))
  }

  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent className='flex flex-col gap-5'>
        <Alert icon={false} severity='error'>
          {/* <AlertTitle>Ensure that these requirements are met</AlertTitle> */}
          Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, one
          number, and one special character.
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name='currentPassword'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Current Password'
                        type={isCurrentPassShown ? 'text' : 'password'}
                        placeholder='············'
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={() => setIsCurrentPassShown(!isCurrentPassShown)}
                                  onMouseDown={e => e.preventDefault()}
                                >
                                  <i className={isCurrentPassShown ? 'tabler-eye-off' : 'tabler-eye'} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }}
                        onChange={e => {
                          field.onChange(e.target.value)
                        }}
                        {...(errors.currentPassword && {
                          error: true,
                          helperText: errors?.currentPassword?.message
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name='newPassword'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='New Password'
                        type={isNewPassShown ? 'text' : 'password'}
                        placeholder='············'
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={() => setIsNewPassShown(!isNewPassShown)}
                                  onMouseDown={e => e.preventDefault()}
                                >
                                  <i className={isNewPassShown ? 'tabler-eye-off' : 'tabler-eye'} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }}
                        onChange={e => {
                          field.onChange(e.target.value)
                        }}
                        {...(errors.newPassword && {
                          error: true,
                          helperText: errors?.newPassword?.message
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name='confirmPassword'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Confirm Password'
                        type={isConfirmPassShown ? 'text' : 'password'}
                        placeholder='············'
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={() => setIsConfirmPassShown(!isConfirmPassShown)}
                                  onMouseDown={e => e.preventDefault()}
                                >
                                  <i className={isConfirmPassShown ? 'tabler-eye-off' : 'tabler-eye'} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }}
                        onChange={e => {
                          field.onChange(e.target.value)
                        }}
                        {...(errors.confirmPassword && {
                          error: true,
                          helperText: errors?.confirmPassword?.message
                        })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button disabled={isLoading} variant='contained' type='submit' sx={{ minWidth: '15%' }}>
                {isLoading ? <CircularProgress color='inherit' size={23} /> : 'Change Password'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePassword
