import React from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RiUserFollowLine, RiUserForbidLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import Loading from '../Loading';
import { MdWorkspacePremium } from 'react-icons/md';

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleBlockUnblock = async (user) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You want to ${user.status === 'blocked' ? 'unblock' : 'block'} this user!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm!"
        });

        if (!result.isConfirmed) return;

        try {
            const newStatus = user.status === 'blocked' ? 'active' : 'blocked';

            await axiosSecure.patch(`/users/${user._id}/status`, {
                status: newStatus
            });

            Swal.fire({
                position: "center",
                icon: "success",
                title: `User ${newStatus === 'blocked' ? 'Blocked' : 'Unblocked'} successfully`,
                showConfirmButton: false,
                timer: 1500
            });

            refetch();
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Action failed", "error");
        }
    };

    return (
        <div className="overflow-x-auto animate__animated animate__fadeIn">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 m-3">
                Manage Users
            </h1>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    users.length > 0 ? users.map((user, i) => <tbody key={user._id}>
                        {/* row 1 */}
                        <tr>
                            <td>{i + 1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}    {user.isPremium && (
                                            <span className="badge badge-warning text-white">
                                                <MdWorkspacePremium /> Premium
                                            </span>
                                        )}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className="font-bold">{user.email}</div>
                                </div>
                            </td>

                            <td className='flex gap-2'>
                                {
                                    user.status === 'blocked' ? (
                                        <button
                                            onClick={() => handleBlockUnblock(user)}
                                            className="px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl py-2 flex items-center gap-1"
                                        >
                                            <RiUserFollowLine /> <span>Unblock</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleBlockUnblock(user)}
                                            className="px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl py-2 flex items-center gap-1"
                                        >
                                            <RiUserForbidLine /> <span>Block</span>
                                        </button>
                                    )
                                }
                            </td>

                        </tr>
                    </tbody>) : <><><div className='m-8 col-span-full text-center font-bold text-2xl text-red-500'>No User Available</div></></>
                }
            </table>
        </div>
    );
};

export default ManageUsers;