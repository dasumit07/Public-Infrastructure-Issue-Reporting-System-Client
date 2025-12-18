import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    useEffect(() => {
        if (!sessionId) return;

        const alreadyVerified = sessionStorage.getItem(`verified_${sessionId}`);
        if (alreadyVerified) return;

        sessionStorage.setItem(`verified_${sessionId}`, "true");

        axios
            .patch(`http://localhost:3000/payment-success?session_id=${sessionId}`)
            .then((res) => {
                console.log(res.data);
                toast.success("Your issue has been Boosted Successfully!");
            })
            .catch(() => {
                toast.error("Payment verification failed!");
            });
    }, [sessionId]);
    return (
        <div className=' flex flex-col justify-center items-center my-15'>
            <img className='h-50' src="https://i.ibb.co.com/Zz9fpfTs/pngtree-flat-style-payment-success-illustration-on-isolated-background-vector-png-image-47735666.jpg" alt="" />
            <h1 className='font-bold text-xl'>PAYMENT SUCCESSFUL!</h1>
            <p className='text-gray-500'>Your payment has been processed successfully</p>
            <Link to={"/dashboard/my-issue"} className='flex justify-center mt-5 mb-10'>
                <button className="btn w-sm bg-teal-500 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold hover:scale-105 transition ease-in-out rounded-2xl">
                    <FaArrowLeft /> Go to my issue</button></Link>
        </div>
    );
};

export default PaymentSuccess;