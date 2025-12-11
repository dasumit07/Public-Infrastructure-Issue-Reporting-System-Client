import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { Link } from 'react-router';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import EditButton from '../../Hooks/EditButton';
import DeleteButton from '../../Hooks/DeleteButton';

const MyIssue = () => {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: issue = [], refetch } = useQuery({
        queryKey: ['my-issue', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?email=${user.email}`);
            return res.data;
        }
    })
    
    return (
        <div className="overflow-x-auto">
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
                    issue.map((issue) => <tbody key={issue._id}>
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
            ${issue.status === "resolved" ? "bg-green-600" : ""}
            ${issue.status === "In Progress" ? "bg-blue-600" : ""}
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
                    </tbody>)
                }
            </table>
        </div>
    );
};

export default MyIssue;