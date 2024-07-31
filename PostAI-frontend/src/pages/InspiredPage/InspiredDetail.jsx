import React, { useState } from 'react'
import Cookies from 'js-cookie';

const InspiredDetail = () => {
    const [idea, setIdea] = useState(localStorage.getItem('inspiredIdea'));
    const [loading, setLoading] = useState(false);
    const [captions, setCaptions] = useState([]);
    const genCaptions = async (e) => {
        e.preventDefault();
        setCaptions([]);
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/post/gen-from-idea`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    idea: idea
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
                    topic: idea,
                    content: content,
                    typeNetwork: 'facebook',
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
                Your Idea
            </div>
            <form className='flex flex-col items-center justify-center gap-3 w-1/2 mx-auto' onSubmit={genCaptions}>
                <input
                    className='text-base font-normal w-4/5 border border-solid border-2 border-gray-300 focus:outline-none rounded py-3 px-6' 
                    type="text" 
                    name="topic" 
                    id="topic"
                    placeholder=''
                    value={idea}
                    onChange={(e) => {
                        setIdea(e.target.value)
                    }}
                />
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

export default InspiredDetail