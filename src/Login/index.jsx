/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { EMPTY_LOGIN_NAME, EMPTY_PASSWORD } from '../_main/errorConstants'
import { PASSWORD_REGEX, NOT_EMPTY_REGEX } from '../_main/constants'
import { InputAdornment, IconButton } from '@mui/material'
import { TextField } from 'formik-mui'
import { useTranslation } from 'react-i18next'
import { setUser } from './action'
import { useImmer } from 'use-immer'
import { DASHBOARD_ROUTE, REGISTER_ROUTE } from '../_main/routeConstants'
import { LoadingButton } from '../components/atoms'
import { useNavigate, useLocation } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import './style.css'
import { useGlobalContext } from '../_main/context'

function Login() {
  const { t } = useTranslation()
  const { dispatch } = useGlobalContext()
  const [store, updateStore] = useImmer({
    errorMsg: '',
    showPassword: false
  })

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    sessionStorage.path = location.pathname
  }, [location.pathname])

  const removeMsg = () => {
    updateStore((draft) => {
      draft.errorMsg = ''
    })
  }

  const handleSubmit = async (formObj) => {
    const result = await setUser(formObj, dispatch)
    if (result?.isSuccess) {
      navigate(DASHBOARD_ROUTE)
    } else {
      updateStore((draft) => {
        draft.errorMsg = 'User not found. Please register first.'
      })
    }
  }

  const handleClickShowPassword = () => {
    updateStore((draft) => {
      draft.showPassword = !draft.showPassword
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleRegister = () => {
    navigate(REGISTER_ROUTE)
  }

  return (
    <div id='login-container' className='flex flex-center background'>
      <div className='login-form-container flex flex-center'>
        <div className='login-form'>
          <div className='name'>{t('login_title')}</div>
          <Formik
            enableReinitialize
            initialValues={{ name: '', password: '' }}
            onSubmit={handleSubmit}
            validate={(values) => {
              const errors = {}
              for (const obj in values) {
                switch (obj) {
                  case 'name':
                    if (!RegExp(NOT_EMPTY_REGEX).test(values[obj])) {
                      errors.name = EMPTY_LOGIN_NAME
                    }
                    break
                  case 'password':
                    if (!RegExp(PASSWORD_REGEX).test(values[obj])) {
                      errors.password = EMPTY_PASSWORD
                    }
                    break
                  default:
                    break
                }
              }
              return errors
            }}
          >
            {({ submitForm }) => (
              <Form>
                <div className='pt-1'>
                  <Field
                    component={TextField}
                    className='field'
                    name='name'
                    type='text'
                    label={t('login_empno')}
                    variant='filled'
                    autoComplete='one-time-code'
                    size='small'
                    onInput={removeMsg}
                  />
                  <Field
                    component={TextField}
                    className='field'
                    name='password'
                    type={store.showPassword ? 'text' : 'password'}
                    label={t('login_password')}
                    variant='filled'
                    autoComplete='one-time-code'
                    size='small'
                    onInput={removeMsg}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {store.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  {store.errorMsg && (
                    <div className='invalidUser'>{store.errorMsg}</div>
                  )}
                  <div className='submit-container'>
                    <LoadingButton
                      onClick={submitForm}
                      className='submit-button'
                      type='submit'
                    >
                      {t('login_btn')}
                    </LoadingButton>
                  </div>
                  <div className='forgotbtn' onClick={handleRegister}>
                    {t('register')}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login
