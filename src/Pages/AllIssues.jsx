import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { Link } from 'react-router';
import Card from './Card/Card';
import Loading from './Loading';

const AllIssues = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['all-issues' ],
        queryFn: async () =>{
            const res = await axiosSecure.get('/issues/all');
            return res.data;
        }
    })
    if(isLoading){
            return <Loading></Loading>
        }
    return (
        <div className='mt-20' >

            <h1
                className="text-center text-3xl font-bold mt-10 bg-linear-to-r from-teal-600 to-teal-200 text-transparent bg-clip-text" >All Issues
            </h1>
            
             <form className='md:flex justify-center gap-2 mt-5'>
                    <div className='flex mb-2'>
                        <label className="input">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input name='search' type="search" placeholder="Search" />
                        </label>
                        <button type='submit' className='btn bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  py-2 hover:scale-105 transition ease-in-out'>Search</button>
                    </div>

                    <select
                        
                        className="border px-4 py-2 rounded bg-white text-gray-700 hover:border-teal-400"
                    >
                        <option value="">All Categories</option>
                        <option>Road Damage</option>
                        <option>Street Light</option>
                        <option>Garbage</option>
                        <option>Water Logging</option>
                        <option>Illegal Parking</option>
                        <option>Others</option>
                    </select>

                </form>
            
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 w-11/12 mx-auto mt-10">
                {issues.map((issue) => (
                    <div
                        key={issue._id}

                        className="transition-transform duration-300 hover:scale-105"
                    >
                        <Card issue={issue}></Card>
                    </div>
                ))}
            </div>
            <div className="text-center mb-5">
                <Link to="/">
                    <button className="btn mt-5 bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  rounded-2xl py-2 hover:scale-105 transition ease-in-out">
                        ← Go Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AllIssues;