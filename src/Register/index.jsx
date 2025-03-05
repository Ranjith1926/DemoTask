/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import { useNavigate, useLocation } from 'react-router-dom'
import { useImmer } from 'use-immer'
import { BASE_ROUTE } from '../_main/routeConstants'
import { LoadingButton } from '../components/atoms'
import { NOT_EMPTY_REGEX } from '../_main/constants'
import { registerUser } from './action'
import { useGlobalContext } from '../_main/context'

import './style.css'

function Register() {
  const { dispatch } = useGlobalContext()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    sessionStorage.path = location.pathname
  }, [location.pathname])

  const [store, updateStore] = useImmer({
    errorMsg: ''
  })

  const removeMsg = () => {
    updateStore((draft) => {
      draft.errorMsg = ''
    })
  }

  const handleSubmit = (values) => {
    registerUser(values, dispatch);
    navigate(BASE_ROUTE);
  };

  return (
    <div id='login-container' className='flex flex-center background'>
      <div className='login-form-container flex flex-center'>
        <div className='login-form'>
          <div className='name'>Register</div>
          <Formik
            enableReinitialize
            initialValues={{ name: '', mobile: '', address: '', password: '' }}
            onSubmit={handleSubmit}
            validate={(values) => {
              const errors = {}
              Object.keys(values).forEach((obj) => {
                if (!RegExp(NOT_EMPTY_REGEX).test(values[obj])) {
                  errors[obj] = `Field cannot be empty`
                }
              })
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
                    label='Name'
                    variant='filled'
                    size='small'
                    onInput={removeMsg}
                  />
                  <Field
                    component={TextField}
                    className='field'
                    name='mobile'
                    label='Mobile'
                    variant='filled'
                    size='small'
                    onInput={removeMsg}
                  />
                  <Field
                    component={TextField}
                    className='field'
                    name='address'
                    label='Address'
                    variant='filled'
                    size='small'
                    onInput={removeMsg}
                  />
                  <Field
                    component={TextField}
                    className='field'
                    name='password'
                    label='Password'
                    type='password'
                    variant='filled'
                    size='small'
                    onInput={removeMsg}
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
                      Register
                    </LoadingButton>
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

export default Register
