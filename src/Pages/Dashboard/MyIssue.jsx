import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { Link } from 'react-router';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import EditButton from '../../Hooks/EditButton';
import DeleteButton from '../../Hooks/DeleteButton';
import Loading from '../Loading';

const MyIssue = () => {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: issue = [], refetch, isLoading } = useQuery({
        queryKey: ['my-issue', user?.email, statusFilter, categoryFilter],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (user.email) params.append('email', user.email);
            if (statusFilter) params.append('status', statusFilter);
            if (categoryFilter) params.append('category', categoryFilter);

            const res = await axiosSecure.get(`/issues?${params.toString()}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto animate__animated animate__fadeIn">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 m-3">
                My Issues
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
                <select className="select select-warning w-[130px]"
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Road Damage">Road Damage</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Garbage">Garbage</option>
                    <option value="Water Logging">Water Logging</option>
                    <option value="Illegal Parking">Illegal Parking</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Issue Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    issue.length > 0 ? issue.map((issue) => <tbody key={issue._id}>
                        {/* row 1 */}
                        <tr>
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
                            <td className='flex gap-2'>
                                {
                                    issue?.status === 'pending' ? <>
                                        <EditButton issue={issue} selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} refetch={refetch}></EditButton>
                                        <DeleteButton issue={issue} refetch={refetch} ></DeleteButton>
                                    </> : null
                                }
                                <Link to={`/issues/${issue._id}`}><button className="bg-teal-600  px-4 text-sm hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center gap-1">
                                    <IoMdInformationCircleOutline /> <span>Details</span>
                                </button></Link>
                            </td>

                        </tr>
                    </tbody>) : <><div className='m-8 col-span-full text-center font-bold text-2xl text-red-500'>No Issue Available</div></>
                }
            </table>
        </div>
    );
};

export default MyIssue;