import React from 'react'
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom'
import {
  BASE_ROUTE,
  DASHBOARD_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE
} from './_main/routeConstants'
import Wrap from './Wrap'
import Login from './Login'
import Dashboard from './DashBoard'
import NotFound from './NotFound'
import Register from './Register'
import Profile from './Profile'

import './_main/styles/index.css'

const isAuthenticated = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return user !== null
}

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to={REGISTER_ROUTE} replace />
}

function RootApp() {
  const router = createHashRouter([
    {
      path: BASE_ROUTE,
      element: <Login />
    },
    {
      path: REGISTER_ROUTE,
      element: <Register />
    },
    {
      path: DASHBOARD_ROUTE,
      element: (
        <ProtectedRoute>
          <Wrap>
            <Dashboard />
          </Wrap>
        </ProtectedRoute>
      )
    },
    {
      path: PROFILE_ROUTE,
      element: (
        <ProtectedRoute>
          <Wrap>
            <Profile />
          </Wrap>
        </ProtectedRoute>
      )
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return <RouterProvider router={router} />
}

export default RootApp
