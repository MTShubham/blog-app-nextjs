import { useContext, useState } from 'react';

const Footer = () => {

    return (
        <footer className={`md:flex md:justify-between md:items-center px-2 md:px-20 py-5`}>
            <div className='pl-3 md:pl-0 flex justify-between items-center'>
                <span className='text-xl md:text-2xl font-semibold'>
                    <span className="text-gray-500">Teal</span>Feed
                </span>
            </div>

            <div className={`md:flex md:items-center pl-3`}>
                <div className='my-4 md:my-0'>
                    <h2 className='text-lg md:text-xl font-semibold'>Our Address</h2>
                    <p className='text-sm md:text-base mt-2'>
                        123 Main Street <br />
                        Chandkheda, Ahmedabad - 382424 <br />
                        India
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;