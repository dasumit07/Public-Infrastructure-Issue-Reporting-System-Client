import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='w-11/12 mx-auto flex flex-col md:flex-row md:gap-10 justify-center items-center' >
            <Link to={"/"} className='flex justify-center mt-5'>
                <button className="btn bg-teal-500 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold hover:scale-105 transition ease-in-out rounded-2xl">
                    <FaArrowLeft /> Go Back</button></Link>
            <Outlet></Outlet>
            <img src="https://i.ibb.co.com/7JDwfttW/images.png" alt="" />
        </div>
    );
};

export default AuthLayout;