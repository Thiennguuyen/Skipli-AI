import React, { useState } from 'react'
import { RiRobot2Fill } from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'

const VerificationPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState('');
    const email = localStorage.getItem('userEmail');

    const handleChange = (e) => {
        setFormData(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/user/verifycode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ code: formData })
            });
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate('/dashboard');
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-16 max-w-[40%] mx-auto mt-8'>
            <div className="flex items-center flex-col justify-center gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/">
                    <RiRobot2Fill size={70} className='mt-8'/>
                    <h1 className='font-extrabold'>Skipli AI</h1>
                </NavLink>
            </div>
            <div className='max-w-screen-2xl p-2 font-semibold text-4xl my-4 mx-auto'>Welcome to Skipli AI</div>
            <div className='max-w-screen-2xl p-4 text-base font-normal mb-3 mx-auto'>
                Skipli AI has sent an OTP code to: <span className='font-semibold'>{email}</span>
            </div>
            <form className='flex flex-col items-center justify-center gap-6' onSubmit={handleSubmit}>
                <label htmlFor="code"></label>
                <input
                    className='text-base font-normal w-4/5 border border-solid border-2 border-gray-300 focus:outline-none rounded py-3 px-6' 
                    type="number" 
                    name="code" 
                    id="code"
                    placeholder='Enter your code here'
                    value={formData}
                    onChange={handleChange}
                />
                <button type="submit" className='text-base font-normal w-4/5 p-3 bg-purple-400 rounded'>
                    Submit
                </button>
            </form>
            {
                loading && (
                    <span className="mx-auto loader mt-5"></span>
                )
            }
        </div>
    )
}

export default VerificationPage