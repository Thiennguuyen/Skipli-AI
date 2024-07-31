import React from 'react'
import { FaRegUser } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { RiLogoutBoxLine, RiRobot2Fill } from 'react-icons/ri'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = () => {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const arrPath = ['/dashboard', '/scratch', '/scratch/facebook', '/scratch/instagram', '/scratch/twitter', '/inspired', '/inspired/detail']

    const handleLogout = () => {
        Cookies.remove('uid');
        localStorage.clear();
        navigate('/');
    };

    return (
        <aside className='absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gray-300 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 translate-x-0 w-[15%]'>
            <div className="flex items-center flex-col justify-center gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/">
                    <RiRobot2Fill size={70} className='mt-8'/>
                    <h1 className='font-extrabold'>Skipli AI</h1>
                </NavLink>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <div className="mt-5 py-4 lg:mt-9">
                    <div>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={`group relative flex items-center gap-2.5 rounded-sm w-full py-2 px-7 lg:px-10 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-meta-4 ${
                                        arrPath.includes(pathname) && 'bg-gray-400 dark:bg-meta-4'
                                    }`}
                                >
                                    <LuLayoutDashboard size={20} />
                                    Services
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={`group relative flex items-center gap-2.5 rounded-sm w-full py-2 px-7 lg:px-10 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-meta-4 ${
                                        pathname === '/profile' && 'bg-gray-400 dark:bg-meta-4'
                                    }`}
                                >
                                    <FaRegUser size={20} />
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <div
                                    onClick={(e) => {handleLogout()}}
                                    className={`group relative flex items-center gap-2.5 rounded-sm w-full py-2 px-7 lg:px-10 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-meta-4 ${
                                        pathname === '' && 'bg-gray-400 dark:bg-meta-4'
                                    } cursor-pointer`}
                                >
                                    <RiLogoutBoxLine size={20} />
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar