import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../../services/operations/authAPI';

function ProfileUpdate() {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        password: user.password || '',
    });

    const [showPassword, setShowPassword] = useState(false);    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(formData, token, dispatch));
    };

    return (
        <div className="w-7/12 mx-auto p-4 mt-10 text-gray-300">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='flex flex-col gap-2'>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder='Enter your Full name'
                        value={formData.fullName}
                        onChange={handleChange}
                        className="inputStyle"
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="passowrd" className='flex justify-between items-center'>
                        <span>Password</span>
                        <span onClick={() => setShowPassword(!showPassword)} className=' cursor-pointer underline' >{showPassword ? "Hide Password" : "Show Password"}</span>
                    </label>
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder='Enter your password' className='inputStyle' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder='Enter your phone number' className='inputStyle' />
                </div>

                <button
                    type="submit"
                    className="btn"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default ProfileUpdate; 