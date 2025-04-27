import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';

function LoginForm() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChange(e) {

        const {name, value} = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const {email, password} = loginData;

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            toast.error("All fields are required.");
            return;
        }

        login(loginData, dispatch, navigate);

        setLoginData({email: "", password: ""});
    }

  return (
    <div className='border rounded-lg border-gray-800 px-10 p-5 w-[100%] lg:w-[40%]'>
        <h1 className='heading text-center mt-10'>Login to TodoApp</h1>
        <form action="" className='formStyle mt-10' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email*</label>
                <input 
                    required
                    type="text"
                    name='email'
                    value={loginData.email}
                    onChange={handleChange}
                    className='inputStyle'
                    placeholder='Enter email id.'
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Password*</label>
                <input 
                    required
                    type="password"
                    name='password'
                    value={loginData.password}
                    onChange={handleChange}
                    className='inputStyle'
                    placeholder='Enter password.'
                />
            </div>

            <button type='Submit' className='btn bg-green-500 mt-6'>
                Log in
            </button>

            <Link to='/signup' className='text-center underline text-blue'>signup</Link>
        </form>
    </div>
  )
}

export default LoginForm