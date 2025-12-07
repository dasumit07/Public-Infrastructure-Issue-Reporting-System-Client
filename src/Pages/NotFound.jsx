import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className=' flex flex-col justify-center items-center my-15'>
            <img className='h-50' src="https://i.ibb.co.com/fGPCrNXW/dog-unplugged-cable-vector-cute-cord-mouth-showing-warning-illustration-377063168.webp" alt="" />
            <h1 className='font-bold text-xl'>OPPS!! PAGE NOT FOUND</h1>
            <p className='text-gray-500'>The Page you are requesting is not found on our system.</p>
            <Link to={"/"} className='flex justify-center mt-5 mb-10'>
                <button className="btn w-sm bg-teal-500 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold hover:scale-105 transition ease-in-out rounded-2xl">
                    <FaArrowLeft /> Go Back</button></Link>
        </div>
    );
};

export default NotFound;