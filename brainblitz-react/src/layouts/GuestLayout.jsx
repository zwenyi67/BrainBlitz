import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate, Outlet, redirect } from 'react-router-dom';

export default function GuestLayout() {

    const {user, token, role} = useStateContext();

    if(token && role === 'admin') {
        return <Navigate to={'/admin'} />
    }
    if(token && role === 'user') {
          return <Navigate to={'/user'} />
    }

  return (
    <div>
      <Outlet/>
    </div>
  )
}
