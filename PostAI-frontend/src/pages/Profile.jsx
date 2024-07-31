import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';

const Profile = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const id = Cookies.get('uid');

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/post/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            setData(data.result);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUnSave = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/post/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                alert('Unsaved post succecssfully');
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-16'>
            <div className='max-w-screen-2xl p-4 font-semibold text-3xl mb-8 ml-6'>
                Saved Content
            </div>
            {
                loading ? (
                    <span className="loader mx-auto"></span>
                ) : (
                    <div>
                        {
                            Object.entries(data).map(([key, value]) => {
                                return (<div key={key}>
                                    <div className='max-w-screen-2xl p-4 ml-6 text-xl font-medium text-left'>
                                        {key}
                                    </div>
                                    {
                                        <div className='grid grid-cols-2 gap-10 px-10 py-6'>
                                            {value.map((caption, index) => {
                                                return(
                                                    <div className='relative text-base font-normal border border-solid border-2 border-gray-300 rounded p-6 mx-auto mb-3 h-52' key={index}>
                                                        <div className='mb-2'>{caption.content}</div>
                                                        <div className='absolute bottom-0 right-0 p-6 flex justify-end gap-3'>
                                                            <button className='text-base font-medium py-2 px-4 bg-teal-200 rounded'>
                                                                Share
                                                            </button>
                                                            <button 
                                                                className='text-base font-medium py-2 px-4 bg-rose-400 rounded'
                                                                onClick={(e) => {
                                                                    handleUnSave(caption.id);
                                                                }}
                                                            >
                                                                Unsave
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    }
                                </div>)
                            })
                        }
                        
                    </div>
                )
            } 
        </div>
    )
}

export default Profile