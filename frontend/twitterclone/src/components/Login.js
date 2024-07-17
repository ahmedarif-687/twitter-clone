import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/contant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getuser } from '../redux/userslice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [islogin, setislogin] = useState(true);
  const [username, setusername] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (islogin) {
        // Login
        res = await axios.post(`${USER_API_END_POINT}/Login`, { email, password }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        console.log(res); // Log the response to inspect it
        if (res?.data?.success) {
          dispatch(getuser(res?.data?.user));
          navigate('/');
          toast.success(res?.data?.message);
        }
      } else {
        // Signup
        res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        console.log(res); // Log the response to inspect it
        if (res?.data?.success) {
          setislogin(true);
          toast.success(res?.data?.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
      console.error('Error:', error);
    }
  };


const loginsignuphandler =()=>{
  setislogin(!islogin)
}

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-80%'>
        <div>
          <img alt='hello' width={400} src="data:image/png;base64,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" />
        </div>
        <div>
          <div className='my-5'>
            <h1 className='text-6xl font-bold'> Happening now</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{islogin ? "login":"signup"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col'>
            {!islogin && <>
            <input type="text" value={name} onChange={(e)=>setname(e.target.value)} placeholder='Name' className='outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1' />
            <input type="text" value={username} onChange={(e)=>setusername(e.target.value)}placeholder='Username' className='outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1' /></>}
            
            <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Email' className='outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1' />
            <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Password' className='outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1' />
            <button className='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'>{islogin ? "login":"signup"}</button>
            <h1 className='cursor-pointer'>{islogin ?"Don't have an account? " :"Already have an account?"} <span className='font-bold text-blue-600' onClick={loginsignuphandler}>{islogin? "signup":"Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
} 
