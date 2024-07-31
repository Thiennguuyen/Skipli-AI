import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()

    const onClickScratch = () => {
        navigate('/scratch')
    }

    const onClickInspired = () => {
        navigate('/inspired')
    }

    return (
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-16'>
            <div className='max-w-screen-2xl p-4 md:p-6 2xl:p-10 font-semibold text-2xl mb-8 ml-6'>
                Generate post ideas and captions in seconds
            </div>   
            <button 
                className='max-w-screen-2xl p-4 border border-solid border-2 border-gray-300 rounded-md w-5/12 mb-3 ml-10'
                onClick={onClickScratch}
            >
                <div className='text-xl font-medium text-left px-8 py-1'>Start from scratch</div>
                <div className='text-base font-normal text-left px-8 py-1'>Generate new captions to engage, delight, or sell</div>
            </button>
            <button 
                className='max-w-screen-2xl p-4 border border-solid border-2 border-gray-300 rounded-md w-5/12 mt-3 ml-10'
                onClick={onClickInspired}
            >
                <div className='text-xl font-medium text-left px-8 py-1'>Get inspired</div>
                <div className='text-base font-normal text-left px-8 py-1'>Generate post ideas and captions for a topic</div>
            </button>             
        </div>
    )
}

export default Dashboard