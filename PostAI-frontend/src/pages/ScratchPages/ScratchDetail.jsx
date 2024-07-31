import React, { useState } from 'react'
import { FaSortDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ScratchDetail = () => {
    const location = useLocation();
    const { pathname } = location;
    const [loading, setLoading] = useState(false);
    const [showSelection, setShowSelection] = useState(false);
    const [subjectData, setSubjectData] = useState('');
    const [toneValue, setToneValue] = useState('');
    const [captions, setCaptions] = useState([]);
    const tones = ['Friendly', 'Luxury', 'Relaxed', 'Professional', 'Bold', 'Adventurous', 'Witty', 'Persuasive', 'Empathetic'];

    const handleOpenSelection = () => {
        setShowSelection(!showSelection)
    }

    const handleChangeToneValue = (value) => {
        setToneValue(value);
        setShowSelection(!showSelection)
    }

    const genCaptions = async (e) => {
        e.preventDefault();
        setCaptions([]);
        setLoading(true);
        const socialNetwork = pathname.slice(9);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/post/gen`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    socialNetwork: socialNetwork,
                    subject: subjectData,
                    tone: toneValue
                })
            });
            const data = await response.json();
            setCaptions(data.arrResult);
        } catch (error) {
            alert('Request error! Please enter another topic or wait some minutes!')
        } finally {
            setLoading(false);
        }
    }
    
    const onSaveContent = async (content) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/post/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    userId: Cookies.get('uid'),
                    topic: subjectData,
                    content: content,
                    typeNetwork: pathname.slice(9),
                })
            });
            if (response.ok) {
                alert('Content Saved')
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-6'>
            <div className='max-w-screen-2xl font-semibold text-2xl mb-4 w-2/5 mx-auto'>
                {pathname === '/scratch/facebook' && 'Facebook '
                    || pathname === '/scratch/instagram' && 'Instagram '
                    || pathname === '/scratch/twitter' && 'Twitter '
                } post
            </div>
            <form className='flex flex-col items-center justify-center gap-3 w-1/2 mx-auto' onSubmit={genCaptions}>
                <label htmlFor="topic" className='w-4/5'>What topic do you want a caption for?</label>
                <input
                    className='text-base font-normal w-4/5 border border-solid border-2 border-gray-300 focus:outline-none rounded py-3 px-6' 
                    type="text" 
                    name="topic" 
                    id="topic"
                    placeholder=''
                    value={subjectData}
                    onChange={(e) => {
                        setSubjectData(e.target.value)
                    }}
                />

                <label htmlFor="tone" className='w-4/5'>What should your caption sound like?</label>
                <div className='relative inline-block w-4/5'>
                    <div
                        className='text-base font-normal w-full border border-solid border-2 border-gray-300 focus:outline-none rounded py-3 px-6 cursor-pointer' 
                        onClick={handleOpenSelection}
                    >
                        {toneValue || 'Selec an option'}
                    </div>
                    <div 
                        className='absolute top-2 right-4 cursor-pointer p-1 hover:border hover:border-solid hover:border-2 hover:border-gray-300'
                        onClick={handleOpenSelection}
                    >
                        <FaSortDown size={20} color='gray' />
                    </div>
                    <div className={`absolute z-1000 w-full bg-white ${showSelection ? '' : 'hidden'}`}>
                        {
                            tones.map((tone, index) => {
                                return (
                                    <div 
                                        className='text-base font-normal w-full border border-solid border-2 border-gray-300 focus:outline-none rounded py-3 px-6 cursor-pointer'
                                        key={index}
                                        onClick={(e) => {
                                            handleChangeToneValue(tone);
                                        }}
                                    >
                                        {tone}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex justify-end w-4/5'>
                    <button type="submit" className='text-base font-normal w-2/5 p-3 bg-purple-400 rounded'>
                        Generate captions
                    </button>
                </div>
            </form>
            {
                loading && (
                    <span className="mx-auto loader mt-5"></span>
                )
            }
            {
                captions.length > 0 && (
                    <div>
                        <div className='max-w-screen-2xl font-semibold text-2xl my-4 w-2/5 mx-auto'>Captions generated for you</div>
                        {
                            captions.map((caption, index) => {
                                return (
                                    <div className='text-base font-normal w-2/5 border border-solid border-2 border-gray-300 rounded p-6 mx-auto mb-3' key={index}>
                                        <div className='mb-2'>{caption}</div>
                                        <div className='flex justify-end gap-3'>
                                            <button className='text-base font-medium py-2 px-4 bg-teal-200 rounded'>
                                                Share
                                            </button>
                                            <button 
                                                className='text-base font-medium py-2 px-4 bg-zinc-300 rounded'
                                                onClick={(e) => {
                                                    onSaveContent(caption);
                                                }}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                )
                            }) 
                        }
                        
                    </div>
                )
            }
            
        </div>
    )
}

export default ScratchDetail