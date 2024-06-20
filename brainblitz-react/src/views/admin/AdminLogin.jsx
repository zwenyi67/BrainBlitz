import React, { useRef, useState } from 'react'
import AxiosClient from '../../AxiosClient';
import { useStateContext } from '../../contexts/ContextProvider';

export default function AdminLogin() {

    const {user, token, role, setUser, setToken, setRole} = useStateContext();
    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState();
    const emailRef = useRef();
    const passwordRef = useRef();

    const LoginSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        
        AxiosClient.post('/adminlogin',formData )
        .then(({data})=> {
            setUser(data.user);
            setToken(data.token);
            setErrors(data.errors);
            setRole(data.role);
        })
        .catch(err => {
            if (err.response) {
              if (err.response.status === 422) {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
              } else if(err.response.status === 401) {
                console.log(err.response.data.message);
                setErrors('');
                setMessage(err.response.data.message);
              } else {
                console.error('Server error:', err.response.status);
              }
            } else {
              console.error('Network error:', err.message);
            }
          });
    }

  return (
    <div style={{ height: '90vh', }} className='container d-flex justify-content-center align-items-center'>
      <div className="row">
        <div style={{ width: '500px' }} className="col-lg-10 p-3">
          <div className='welcome text-center'>Brain Blitz</div>
          <hr />
          <form onSubmit={LoginSubmit} className="">
            <div className="mb-3">
              <label className='form-lable-col'>Email</label>
              <input ref={emailRef} type="email" className='input-txt' />
              {errors && errors['email'] && (<p className="text-danger text-sm">{errors['email']}</p>)}
              {message && (<p className="text-danger text-sm">{message}</p>)}
            </div>
            <div className="mb-4">
              <label className='form-lable-col'>Password</label>
              <input ref={passwordRef} type="password" className='input-txt' />
              {errors && errors['password'] && (<p className="text-danger text-sm">{errors['password']}</p>)}
            </div>
            <div className='mb-3 d-flex'>
              <button type='submit' className='btn-login px-5'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
