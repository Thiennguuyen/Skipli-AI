import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const InspiredHome = () => {
    const [listIdeas, setListIdeas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputTopic, setInputTopic] = useState('');
    const navigate = useNavigate();

    const handleGenIdea = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/post/genfrom-inspired`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    topic: inputTopic
                })
            });
            const data = await response.json();
            setListIdeas(data.arrResult);
        } catch (error) {
            alert('Request error! Please enter another topic or wait some second!')
        } finally {
            setLoading(false);
        }
    }

    const handleChooseIdea = (idea) => {
        localStorage.setItem('inspiredIdea', idea);
        navigate('/inspired/detail');
    }

    return (
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-16 my-6'>
            <div className='max-w-screen-2xl p-4 font-semibold text-3xl mb-8 ml-6 w-3/5'>
                Get Inspired
            </div>
            {
                listIdeas.length === 0 ? (
                    <div>
                        <div className='max-w-screen-2xl p-4 mb-3 ml-6 text-base font-normal text-left w-3/5'>
                            Stick staring at a blank page? Tell us what topic you have in mind and Skipli AI will generate a list of post ideas and captions for you.
                        </div>
                        <div className='max-w-screen-2xl p-4 mb-3 ml-6 text-xl font-normal text-left w-3/5'>
                            What topic do you want ideas for?
                        </div>
                        <form className='ml-6 p-4 w-3/5' onSubmit={handleGenIdea}>
                            <input 
                                className='text-xl font-normal w-full border border-solid border-2 border-gray-300 focus:outline-none rounded py-3 px-5 mb-3'
                                type="text"
                                placeholder='Enter a topic'
                                value={inputTopic}
                                onChange={(e) => {
                                    setInputTopic(e.target.value);
                                }}
                            />
                            <div className='flex justify-end my-4 gap-5'>
                                <button className='text-base font-medium py-3 px-8 bg-cyan-300 rounded' type='submit'>
                                    Generate ideas
                                </button>
                                {
                                    loading && (
                                        <span className="loader"></span>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <div className='max-w-screen-2xl p-4 mb-3 ml-6 text-xl font-medium text-left w-3/5'>
                            Choose an idea to build some posts
                        </div>
                        {
                            listIdeas.map((idea, index) => {
                                return (
                                    <button 
                                        className='text-xl text-left font-normal ml-10 w-[70%] border border-solid border-2 border-gray-300 rounded p-4 mb-3'
                                        key={index}
                                        onClick={(e) => {
                                            handleChooseIdea(idea);
                                        }}
                                    >
                                        {idea}
                                    </button>
                                )
                            })
                        }
                        
                    </div>
                )
            }
            
        </div>
    )
}

export default InspiredHome