import React, { useState } from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import { SiBoosty } from 'react-icons/si';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import DeleteButton from '../../Hooks/DeleteButton';
import EditButton from '../../Hooks/EditButton';
import BoostButton from '../../Hooks/BoostButton';
import TrackingTimeline from './TrackingTimeline';
import { IoMdWarning } from 'react-icons/io';
import { AiFillLike } from 'react-icons/ai';

const Details = () => {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const params = useParams();
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: issue = [], refetch } = useQuery({
        queryKey: ['issue-details', params.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${params.id}`);
            return res.data;
        }
    })
    const { data: profile } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/profile");
            return res.data;
        }
    });
    const isBlocked = profile?.status === "blocked";
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
                            Location : {issue.location}
                        </p>
                        <p className="text-lg font-semibold bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text">
                            Status : <span className={`px-3 py-1  rounded-full text-white text-xs
                  ${issue.status === "pending" && "bg-yellow-500"}
                  ${issue.status === "in_progress" && "bg-blue-500"}
                  ${issue.status === "working" && "bg-blue-500"}
                  ${issue.status === "resolved" && "bg-green-600"}
                  ${issue.status === "closed" && "bg-gray-700"}
                  ${issue.status === "rejected" ? "bg-red-600" : ""}
          `}> {issue.status}</span>
                        </p>
                    </div>
                    <div className='flex justify-between items-center'>
                        {issue.priority === 'High' ? <p className="text-lg font-semibold bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text  mb-3">Priority : <span className='bg-linear-to-r from-red-700 to-red-500 text-transparent bg-clip-text'>
                        {issue.priority}</span></p> :
                        <p className="text-lg font-semibold bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text  mb-3">Priority : <span className='bg-linear-to-r from-gray-700 to-gray-500 text-transparent bg-clip-text'>
                            {issue.priority}</span></p>}
                            <p className='flex text-teal-700 items-center gap-1 text-lg font-semibold'>Total UpVotes:<span className='flex items-center gap-2 text-xl text-black'><AiFillLike />
                    {issue?.upVotes?.length || 0}</span></p>
                    </div>
                    
                    {
                        issue?.reporterEmail === user?.email &&
                            issue?.status === 'pending' &&
                            !isBlocked ? (
                            <div className="flex items-center justify-between mb-6">
                                <EditButton
                                    issue={issue}
                                    setSelectedIssue={setSelectedIssue}
                                    refetch={refetch}
                                    selectedIssue={selectedIssue}
                                />
                                <DeleteButton
                                    issue={issue}
                                    refetch={refetch}
                                />
                            </div>
                        ) : null
                    }
                    {
                        issue?.reporterEmail === user?.email &&
                        issue?.status === 'pending' &&
                        isBlocked && (
                            <div className="alert alert-error mb-6">
                                <IoMdWarning /> Your account is blocked. You cannot edit or delete issues.
                            </div>
                        )
                    }
                    {
                        issue.paymentStatus === 'paid' ? <>
                            <button
                                disabled
                                className="btn w-full bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center justify-center gap-2"
                            >
                                <SiBoosty /> <span>Boosted</span> <IoCheckmarkDoneSharp />
                            </button></> : <>
                            <BoostButton issue={issue} isBlocked={isBlocked}></BoostButton>
                        </>
                    }
                </div>
            </div>
            {issue.assignedStaff && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50 md:w-1/2">
                    <h2 className="text-lg font-semibold mb-2 bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text">Assigned Staff</h2>
                    <p className='bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text'><span className="font-medium">Name:</span> {issue.assignedStaff.name}</p>
                    <p className='bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text'><span className="font-medium">Email:</span> {issue.assignedStaff.email}</p>
                </div>
            )}
            <TrackingTimeline issue={issue}></TrackingTimeline>

            {
                user.email === issue.reporterEmail ? <><div className="text-center mt-12">
                    <Link to="/dashboard/my-issue">
                        <button className="btn bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  rounded-2xl py-2 hover:scale-105 transition ease-in-out">
                            ← Go to My Issue
                        </button>
                    </Link>
                </div></> : <>
                    <div className="text-center mt-12">
                        <Link to="/all-issues">
                            <button className="btn bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  rounded-2xl py-2 hover:scale-105 transition ease-in-out">
                                ← Go Back
                            </button>
                        </Link>
                    </div></>
            }
        </div>
    );
};

export default Details;