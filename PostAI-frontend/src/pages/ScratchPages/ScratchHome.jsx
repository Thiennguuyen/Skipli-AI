import React from 'react'
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const ScratchHome = () => {
    const navigate = useNavigate();
    const handleClick =  (media) => {
        navigate(`/scratch/${media}`);
    }

    return (
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-16'>
            <div className='max-w-screen-2xl p-4 md:p-6 2xl:p-10 font-semibold text-2xl mb-8 ml-6'>
                Generate unique captions from scratch
            </div>
            <div className='max-w-screen-2xl p-4 mb-3 ml-8 text-base font-normal text-left'>
                Choose the type of post you want a caption for, and let Skipli AI write it for you
            </div>
            <div className='max-w-screen-2xl p-4 mb-3 ml-8 text-base font-normal text-left'>
                What kind of post do you want a caption for?
            </div>
            <button 
                className='flex flex-cols max-w-screen-2xl p-4 border border-solid border-2 border-gray-300 rounded-md w-5/12 mt-3 ml-10'
                onClick={(e) => {
                    handleClick('facebook');
                }}    
            >
                <div className='flex items-center justify-center h-full'>
                    <CiFacebook size={60} />
                </div>
                <div>
                    <div className='text-xl font-medium text-left px-4 py-1'>Facebook post</div>
                    <div className='text-base font-normal text-left px-4 py-1'>Generate caption for a post</div>
                </div>
            </button>
            <button 
                className='flex flex-cols max-w-screen-2xl p-4 border border-solid border-2 border-gray-300 rounded-md w-5/12 mt-3 ml-10'
                onClick={(e) => {
                    handleClick('instagram');
                }}
            >
                <div className='flex items-center justify-center h-full'>
                    <CiInstagram size={60} />
                </div>
                <div>
                    <div className='text-xl font-medium text-left px-4 py-1'>Instagram post</div>
                    <div className='text-base font-normal text-left px-4 py-1'>Generate caption for a post</div>
                </div>
            </button>
            <button 
                className='flex flex-cols max-w-screen-2xl p-4 border border-solid border-2 border-gray-300 rounded-md w-5/12 mt-3 ml-10'
                onClick={(e) => {
                    handleClick('twitter');
                }}
            >
                <div className='flex items-center justify-center h-full'>
                    <CiTwitter size={60} />
                </div>
                <div>
                    <div className='text-xl font-medium text-left px-4 py-1'>Twitter post</div>
                    <div className='text-base font-normal text-left px-4 py-1'>Generate caption for a post</div>
                </div>
            </button>
        </div>
    )
}

export default ScratchHome