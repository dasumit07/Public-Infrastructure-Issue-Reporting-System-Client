import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className=' flex flex-col justify-center items-center my-15'>
            <img className='h-50' src="https://i.ibb.co.com/ksCwSG9J/Word-Press-403-Error.png" alt="" />
            <h1 className='font-bold text-xl'>Oops! Access Restricted</h1>
            <p className='text-gray-500'>This page is restricted. Please contact an administrator if you believe this is a mistake.</p>
            <Link to={"/"} className='flex justify-center mt-5 mb-10'>
                <button className="btn w-sm bg-teal-500 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold hover:scale-105 transition ease-in-out rounded-2xl">
                    <FaArrowLeft /> Go Back</button></Link>
        </div>
    );
};

export default Forbidden;