import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { Link } from 'react-router';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

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
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
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
    const handleEdit = async (data) => {
        try {
            let imageUrl = data.imageUrl || "";


            if (data.image && data.image.length > 0) {
                const imageFile = data.image[0];
                const formData = new FormData();
                formData.append("image", imageFile);

                const uploadRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageApiKey}`,
                    formData
                );

                imageUrl = uploadRes.data.data.display_url;
            }

            const updateData = {
                title: data.title,
                description: data.description,
                category: data.category,
                imageUrl: imageUrl,
                location: data.location,
            };

            const res = await axiosSecure.put(`/issues/${selectedIssue._id}`, updateData);

            if (res.data.modifiedCount) {
                document.getElementById("my_modal_5").close()
                refetch();
                Swal.fire("Updated!", "Issue updated successfully", "success");
            }

        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };
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
                                        <button
                                            onClick={() => {
                                                setSelectedIssue(issue);
                                                reset(issue);
                                                document.getElementById('my_modal_5').showModal();
                                            }}
                                            className="px-4 bg-blue-500 hover:bg-linear-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(issue._id)}
                                            className="px-4 bg-red-500 hover:bg-linear-to-r from-red-700 to-red-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out"
                                        >

                                            <RiDeleteBin6Line />
                                        </button>
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
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-2xl text-center mb-6 bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text">
                        Edit Issue
                    </h3>

                    <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">

                        {/* Title */}
                        <div>
                            <label className="block text-gray-400 font-semibold mb-2">
                                Title
                            </label>
                            <input

                                className="border p-2 rounded w-full"
                                placeholder="Issue Title"
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-400 font-semibold mb-2">
                                Description
                            </label>
                            <textarea

                                className="border p-2 rounded w-full"
                                placeholder="Description"
                                rows={4}
                                {...register("description", {
                                    required: "Description is required",
                                })}
                            ></textarea>
                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-400 font-semibold mb-2">
                                Category
                            </label>
                            <select
                                className="border p-2 rounded w-full"
                                {...register("category", { required: "Category is required" })}
                            >
                                <option value="">Select Category</option>
                                <option value="Road Damage">Road Damage</option>
                                <option value="Street Light">Street Light</option>
                                <option value="Garbage">Garbage</option>
                                <option value="Water Logging">Water Logging</option>
                                <option value="Illegal Parking">Illegal Parking</option>
                                <option value="Others">Others</option>
                            </select>

                            {errors.category && (
                                <p className="text-red-500 text-sm">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-400 font-semibold mb-2">
                                Image
                            </label>
                            <input

                                type="file"
                                className="file-input file-input-accent border rounded w-full"
                                {...register("image")}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-gray-400 font-semibold mb-2">
                                Location
                            </label>
                            <input

                                className="border p-2 rounded w-full"
                                placeholder="Enter Location"
                                {...register("location", { required: "Location is required" })}
                            />

                            {errors.location && (
                                <p className="text-red-500 text-sm">{errors.location.message}</p>
                            )}
                        </div>


                        <div className="modal-action flex justify-between">
                            <button
                                type="submit"
                                tabIndex={-1}
                                className="btn bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-lg">
                                Confirm
                            </button>
                            <button
                                type="button"
                                onClick={() => document.getElementById("my_modal_5").close()}
                                className="btn"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyIssue;