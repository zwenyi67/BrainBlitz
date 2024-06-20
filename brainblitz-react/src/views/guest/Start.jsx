import React from 'react'
import { Link } from 'react-router-dom'

export default function Start() {
  return (
    <div style={{ height: '90vh', }} className='container d-flex justify-content-center align-items-center'>
      <div className="row d-flex justify-content-center">
        <div style={{ width: '500px' }} className="col-lg-10 p-3">
          <div className='text-center welcome'>Welcome To <span className='logo'>BrainBlitz </span></div>
          <br />
          <div className='d-flex flex-column'>
          <Link to={'/play'} className='btn-gradient fw-semibold'>Play as Fun</Link>
          <Link to={'/login'} className='btn-gradient fw-semibold'>Login</Link>
          <Link className='btn-gradient fw-semibold'>Register</Link>
          <Link className='btn-gradient fw-semibold'>Terms & Policies</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
