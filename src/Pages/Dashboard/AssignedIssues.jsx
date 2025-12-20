import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Loading from '../Loading';
import UseAuth from '../../Hooks/UseAuth';
import StatusDropdown from './StatusDropdown';
import { FaChevronDown } from 'react-icons/fa';

const AssignedIssues = () => {
    const axiosSecure = UseAxiosSecure();
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const { user } = UseAuth();
    const { data: issues = [], isLoading, refetch } = useQuery({
        queryKey: ['assigned-issues', user.email, statusFilter, priorityFilter],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (statusFilter) params.append('status', statusFilter);
            if (priorityFilter) params.append('priority', priorityFilter);

            const res = await axiosSecure.get(`/staff/issues?${params.toString()}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-visible animate__animated animate__fadeIn">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 m-3">
                Assigned Issues
            </h1>
            <div className='md:flex gap-1 ml-3'>
                <select className="select select-warning w-[100px]"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="working">Working</option>
                    <option value="resolved">Resolved</option>
                </select>
                <select className="select select-warning w-[110px]"
                    value={priorityFilter}
                    onChange={e => setPriorityFilter(e.target.value)}
                >
                    <option value="">All Priority</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                </select>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Issue Name</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    issues.length > 0 ? issues.map((issue, i) => <tbody key={issue._id}>
                        {/* row 1 */}
                        <tr>
                            <td>{i + 1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={issue.imageUrl}
                                                alt={issue.title} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{issue.title}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span
                                    className={`px-3 py-1  rounded-full text-white text-xs
            ${issue.status === "pending" ? "bg-yellow-500" : ""}
            ${issue.status === "in_progress" ? "bg-blue-600" : ""}
            ${issue.status === "working" ? "bg-blue-600" : ""}
            ${issue.status === "resolved" ? "bg-green-600" : ""}
            ${issue.status === "closed" ? "bg-gray-600" : ""}
            ${issue.status === "rejected" ? "bg-red-600" : ""}
          `}
                                >
                                    {issue.status}
                                </span>
                            </td>
                            <td>
                                <div className={`font-bold ${issue.priority === 'High' ? 'text-red-500' : 'text-gray-500'}`}>{issue.priority}</div>
                            </td>
                            <td>
                                {
                                    issue.status === 'closed' ?
                                        <button className="btn btn-sm bg-teal-500 text-white flex items-center gap-1">Change Status <FaChevronDown /></button>
                                        : <StatusDropdown issue={issue} refetch={refetch}></StatusDropdown>
                                }

                            </td>

                        </tr>
                    </tbody>) : <><div className='m-8 col-span-full text-center font-bold text-2xl text-red-500'>No Issue Available</div></>
                }
            </table>
        </div>
    );
};

export default AssignedIssues;