import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const EditButton = ({issue, selectedIssue,setSelectedIssue,refetch }) => {
    const axiosSecure = UseAxiosSecure();
     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
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
        <div>
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

export default EditButton;