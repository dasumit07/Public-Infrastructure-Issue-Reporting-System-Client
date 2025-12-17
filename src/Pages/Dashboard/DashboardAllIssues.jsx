import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { FaTasks } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import Loading from '../Loading';

const DashboardAllIssues = () => {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const staffModalRef = useRef();
    const axiosSecure = UseAxiosSecure();

    const { data: issues = [], refetch , isLoading } = useQuery({
        queryKey: ['dashboard-all-issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues/all');
            return res.data;
        }
    })
    
    const { data: staffs = [], } = useQuery({
        queryKey: ['assign-staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staffs');
            return res.data;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    const openAssignStaffModal = (issue) => {
        setSelectedIssue(issue)
        staffModalRef.current.showModal()
    }
    const handleAssignStaff = async (staff) => {
        try {
            await axiosSecure.patch(
                `/issues/${selectedIssue._id}/assign-staff`,
                {
                    staff: {
                        staffId: staff._id,
                        name: staff.name,
                        email: staff.email
                    }
                }
            );

            staffModalRef.current.close();
            setSelectedIssue(null);
            Swal.fire("Staff assigned successfully");
            refetch(); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Assignment failed");
        }
    };
    const handleRejectIssue = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This issue will be rejected permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Reject',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/issues/${id}/reject`);
                Swal.fire('Rejected!', 'The issue has been rejected.', 'success');
                refetch();
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 m-3">
                All issues
            </h1>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Issue Name</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Assign Staff</th>
                        <th>Action</th>
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
            ${issue.status === "resolved" ? "bg-green-600" : ""}
            ${issue.status === "In Progress" ? "bg-blue-600" : ""}
          `}
                                >
                                    {issue.status}
                                </span>
                            </td>
                            <td>
                                <div className="font-bold">{issue.category}</div>
                            </td>
                            <td>
                                <div className={`font-bold ${issue.priority === 'High' ? 'text-red-500' : 'text-gray-500'}`}>{issue.priority}</div>
                            </td>
                            <td>
                                {issue.assignedStaff ? (
                                    <span className="text-green-600 font-semibold flex items-center gap-1">
                                       <MdOutlineAssignmentTurnedIn size={20} /> {issue.assignedStaff.name}
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => openAssignStaffModal(issue)}
                                        className="bg-teal-600  px-4 text-sm hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center gap-1"
                                    >
                                        <FaTasks /> Assign staff
                                    </button>
                                )}
                            </td>
                            <td>
                                {issue.status === 'pending' && (
                                    <button
                                        onClick={() => handleRejectIssue(issue._id)}
                                        className="bg-red-600  px-4 text-sm hover:bg-linear-to-r from-red-700 to-red-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center gap-1"
                                    >
                                        Reject
                                    </button>
                                )}
                            </td>
                        </tr>
                    </tbody>) : <><div className='m-8 text-center font-bold text-2xl text-red-500'>No Issue Available</div></>
                }
            </table>
            <dialog ref={staffModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffs.map((staff, i) => <tr>
                                    <th>{i + 1}</th>
                                    <td className='font-bold'>{staff.name}</td>
                                    <td className='font-bold'>{staff.email}</td>
                                    <td><button
                                        onClick={() => handleAssignStaff(staff)}
                                        className="bg-teal-600  px-4 text-sm hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center gap-1">
                                        Assign
                                    </button></td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DashboardAllIssues;