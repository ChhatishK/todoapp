import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';

function SignupForm() {

    const [role, setRole] = useState('');

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {fullName, email, password, phoneNumber, accountType} = formData;

    function handleChange(e) {

        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!fullName || !email || !phoneNumber || !password || !role) {
            toast.error("All fields are requried!");
            return;
        }
        
        formData.accountType = role;

        const response = await signup(formData, dispatch, navigate);
        console.log(response);

        if (!response) {
            return;
        }

        setFormData({fullName: "", email: "", phoneNumber: "", password: ""})
    }

  return (
    <div className='border rounded-lg border-gray-800 px-10 p-1 w-[100%] lg:w-[40%] text-gray-300'>
        <h1 className='heading text-center mt-5'>Signup to TodoApp</h1>
        <form action="" className='formStyle mt-5' onSubmit={handleSubmit}>

            <div className='flex flex-col gap-2'>
                <label htmlFor="fullName">Full Name*</label>
                <input 
                    required
                    type="text"
                    name='fullName'
                    value={fullName}
                    onChange={handleChange}
                    className='inputStyle'
                    placeholder='Enter you full name.'
                    autoComplete='off'
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email*</label>
                <input 
                    required
                    type="email"
                    name='email'
                    value={email}
                    onChange={handleChange}
                    className='inputStyle'
                    placeholder='Enter email id.'
                    autoComplete='off'
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="phoneNumber">Phone Number*</label>
                <input 
                    required
                    type="text"
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={handleChange}
                    className='inputStyle'
                    placeholder='Enter email id.'
                    autoComplete='off'
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Password*</label>
                <input 
                    required
                    type="password"
                    name='password'
                    value={password}
                    onChange={handleChange}
                    className='inputStyle'
                    placeholder='Enter password.'
                    autoComplete='off'
                />
            </div>

            <p>Role*</p>
            <div className='flex border rounded-lg border-gray-800'>
                <div className={`py-3 text-center w-[50%] border-r border-gray-800 cursor-pointer ${role === "Client" ? "bg-gray-700": null} rounded-l-lg`} onClick={() => setRole("Client")}>Client</div>
                <div className={`py-3 w-[50%] text-center cursor-pointer ${role === 'Admin' ? "bg-gray-700" : null}`} onClick={() => setRole('Admin')}>Admin</div>
            </div>

            <button className='btn bg-green-500 mt-6'>
                Sign up
            </button>

            <Link to='/login' className='text-center underline text-blue'>Login</Link>
        </form>
    </div>
  )
}

export default SignupForm