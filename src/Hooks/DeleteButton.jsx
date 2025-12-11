import React from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from './UseAxiosSecure';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router';

const DeleteButton = ({refetch,issue}) => {
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/issues/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            refetch();
                            navigate('/dashboard/my-issue');
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your issue has been deleted.",
                                icon: "success"
                            });
                        }
                    });

            }
        });
    }
    return (
        <div>
            <button
                onClick={() => handleDelete(issue._id)}
                className="px-4 bg-red-500 hover:bg-linear-to-r from-red-700 to-red-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center gap-1"
            >

                <RiDeleteBin6Line /> <span>Delete</span>
            </button>
        </div>
    );
};

export default DeleteButton;