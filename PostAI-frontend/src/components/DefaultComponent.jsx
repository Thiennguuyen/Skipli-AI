import React from 'react'
import Sidebar from './Sidebar'

const DefaultComponent = ({children}) => {
    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default DefaultComponent