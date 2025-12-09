import React from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';

const Details = () => {
    const params = useParams();
    const {user} = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: issue = [] } = useQuery({
        queryKey: ['issue-details', params.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${params.id}`);
            return res.data;
        }
    })
    return (
        <div className="max-w-5xl mx-auto px-6 py-16 mt-10 animate__animated animate__fadeInDown">

            <div className="flex flex-col md:flex-row gap-10 items-start">
                <img
                    src={issue.imageUrl}
                    alt={issue.title}
                    className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover" />

                <div className="flex-1">

                    <h1 className="text-3xl font-bold bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text mb-3">
                        Title: {issue.title}
                    </h1>

                    <p className="text-gray-400 mb-2">
                        <span className="font-semibold">Category:</span> {issue.category}
                    </p>
                    <p className="text-gray-400 mb-2">
                        <span className="font-semibold">Reporter’s Name:</span> {issue.reporterName}
                    </p>
                    <p className="text-gray-400 mb-2">
                        <span className="font-semibold">Reporter’s Email:</span> {issue.reporterEmail}
                    </p>
                    <p className="text-gray-400 mb-2">
                        <span className="font-semibold">Reported At:</span> {issue.createdAt}
                    </p>
                    <p className="text-gray-400 mb-4">
                        <span className="font-semibold">Description:</span> {issue.description}
                    </p>

                    <p className="text-gray-700 mb-5 leading-relaxed"></p>

                    <div className="flex items-center justify-between mb-6">
                        <p className="text-lg font-semibold bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text">
                            Location: {issue.location}
                        </p>
                        <p className="text-lg font-semibold bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text">
                            Status: <span className={`px-3 py-1  rounded-full text-white text-xs
            ${issue.status === "pending" ? "bg-yellow-500" : ""}
            ${issue.status === "resolved" ? "bg-green-600" : ""}
            ${issue.status === "In Progress" ? "bg-blue-600" : ""}
          `}> {issue.status}</span>
                        </p>
                    </div>
                    {
                        issue?.reporterEmail === user?.email && issue?.status === 'pending' ? <div className="flex items-center justify-between mb-6">
                        <button
                         className="px-4 bg-blue-500 hover:bg-linear-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out"
                        >
                            Edit
                        </button>

                        <button   className="px-4 bg-red-500 hover:bg-linear-to-r from-red-700 to-red-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out"
                        >

                            Delete
                        </button>
                    </div> : null
                    }


                    <button
                        className="btn w-full bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out"
                    >
                        Boost
                    </button>
                </div>
            </div>

            <div className="text-center mt-12">
                <Link to="/all-issues">
                    <button className="btn bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  rounded-2xl py-2 hover:scale-105 transition ease-in-out">
                        ← Go Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Details;