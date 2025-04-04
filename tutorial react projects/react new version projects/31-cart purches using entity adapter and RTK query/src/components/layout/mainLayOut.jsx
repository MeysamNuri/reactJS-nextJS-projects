import React from 'react';
import Navbar from '../NavBar';


const MainLayOut = ({ children }) => {
    return (
        <div className='flex flex-col min-h-s'>
            <Navbar />
            <main>{children}</main>

        </div>
    );
}

export default MainLayOut;