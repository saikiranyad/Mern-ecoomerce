import React, { useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  console.log(backendUrl + '/api/user/register')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          console.log(response.data)
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        console.log(response)
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success(response.data.message)

        } else {
          toast.error(response.data.message)
        }
      }

    } catch (err) {
      console.log(err)
      toast.error(err.message)

    }
  }
  useEffect(()=>{
      if(token){
        navigate('/')
      }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}

      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='password' />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot your password</p>
        {
          currentState === 'Login' ?
            <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p> :
            <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login here</p>
        }
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>

    </form>
  )
}

export default Login