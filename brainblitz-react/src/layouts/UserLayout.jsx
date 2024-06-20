import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AxiosClient from '../AxiosClient';
import {useEffect} from 'react';

export default function UserLayout() {

  const { token, user, role, setUser, setToken, setRole } = useStateContext();
  const { pathname } = useLocation();

  useEffect(() => {
    AxiosClient.get('/user')
    .then(({data}) => {
      setUser(data);
    })
  },[])

  if (!token) {
    return <Navigate to="/" />;
  }
  if (token && role === 'admin') {
    return <Navigate to="/admin" />;
  }

  const Logout = (e)=> {
    e.preventDefault();

    if(!window.confirm('Are You Sure you want to logout ?')) {
        return 
    }

    AxiosClient.get('/logout')
    .then(() => {
        setUser(null);
        setToken(null);
        setRole(null);
    })
    .catch(err => {
        if (err.response) {
          if (err.response.status === 422) {
            console.log(err.response.data.errors);
          } else {
            console.error('Server error:', err.response.status);
          }
        } else {
          console.error('Network error:', err.message);
        }
      });
}

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-5">
          <div className="left-box">
            <div className="d-flex">
              <img className='profile-img' src="tyler.jpg" alt="UserName" />
              <div>{user.name}</div>
            </div>
            <button onClick={Logout} className='btn-gradient'>Logout</button>
          </div>
        </div>
        <div className="col-lg-7">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
