import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useSearchParams } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { SiBoosty } from 'react-icons/si';
import { FiAlertCircle } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

const Details = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
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
    const handleBoost = async(issue) => {
        const paymentInfo = {
            issueId: issue._id,
            title: issue.title,
            reporterEmail: issue.reporterEmail,
        }
        const res = await axiosSecure.post('/create-payment-intent', paymentInfo);
        window.location.href = res.data.url;
        
    };
    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                });
        }
    }, [sessionId, axiosSecure]);
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
                    {issue.priority === 'High' ? <p className="text-lg font-semibold bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text  mb-3">Priority : <span className='bg-linear-to-r from-red-700 to-red-500 text-transparent bg-clip-text'>
                        {issue.priority}</span></p> : 
                        <p className="text-lg font-semibold bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text  mb-3">Priority : <span className='bg-linear-to-r from-gray-700 to-gray-500 text-transparent bg-clip-text'>
                        Low</span></p>}
                    {
                        issue?.reporterEmail === user?.email && issue?.status === 'pending' ? <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => {
                                    setSelectedIssue(issue);
                                    reset(issue);
                                    document.getElementById('my_modal_5').showModal();
                                }}
                                className="px-4 bg-blue-500 hover:bg-linear-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center gap-1"
                            >
                                <FaEdit /> <span>Edit</span>
                            </button>

                            <button
                                onClick={() => handleDelete(issue._id)}
                                className="px-4 bg-red-500 hover:bg-linear-to-r from-red-700 to-red-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center gap-1"
                            >

                                <RiDeleteBin6Line /> <span>Delete</span>
                            </button>
                        </div> : null
                    }
                    {
                        issue.paymentStatus === 'paid' ?<>
                        <button
                        disabled
                        className="btn w-full bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center justify-center gap-2"
                    >
                        <SiBoosty /> <span>Boosted</span> <IoCheckmarkDoneSharp />
                    </button></> : <>
                    <div
                        role="status"
                        aria-live="polite"
                        className="my-3 flex items-start gap-3 bg-yellow-50 border-l-4 border-yellow-300 p-3 rounded-md"
                    >
                        <div className="text-yellow-600 mt-0.5">
                            <FiAlertCircle size={18} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-800 leading-tight">
                                <strong>Boost makes your issue High Priority</strong> and increases
                                visibility.{" "}
                                <span className="font-medium">This feature may involve an additional cost of 100 TK per issue..</span>
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                Click <span className="font-semibold">Boost</span> to prioritize your issue.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleBoost(issue)}
                        className="btn w-full bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center justify-center gap-2"
                    >
                        <SiBoosty /> <span>Boost</span>
                    </button></>
                    }
                </div>
            </div>

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

export default Details;