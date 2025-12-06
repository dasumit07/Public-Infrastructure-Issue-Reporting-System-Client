import React from 'react';
import { Link } from 'react-router';

const LatestResolveIssues = () => {
    return (
        <div className='w-11/12 mx-auto mt-8'>
            <div className='lg:flex justify-between items-center'>
                <h1
        className=" text-3xl font-bold bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text mb-8" >
        Latest Resolve Issues
      </h1>
            <Link
        className=" font-bold bg-linear-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text mb-8 hover:text-teal-700" >
        View all Issues
      </Link>
            </div>
        </div>
    );
};

export default LatestResolveIssues;