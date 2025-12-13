import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const StaffUpdate = ({staff,refetch }) => {
    const axiosSecure = UseAxiosSecure();
     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const handleEdit = async (data) => {
        try {
            let photoURL = data.imageUrl || "";


            if (data.imageUrl && data.imageUrl.length > 0) {
                const imageFile = data.imageUrl[0];
                const formData = new FormData();
                formData.append("image", imageFile);

                const uploadRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageApiKey}`,
                    formData
                );

                photoURL = uploadRes.data.data.display_url;
            }

            const UpdateStaffInfo = {
                email: data.email,
                phone: data.phone,
                name: data.name,
                photoURL,
                password: data.password
            };

            const res = await axiosSecure.put(`/staff/${staff._id}`, UpdateStaffInfo);

            if (res.data.modifiedCount) {
                document.getElementById("my_modal_5").close()
                refetch();
                Swal.fire("Updated!", "Staff updated successfully", "success");
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
                    reset(staff);
                    document.getElementById('my_modal_5').showModal();
                }}
                className="px-4 bg-blue-500 hover:bg-linear-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center gap-1"
            >
                <FaEdit /> <span>Update</span>
            </button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-2xl text-center mb-6 bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text">
                        Update Staff Information
                    </h3>

                    <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block text-gray-400 font-semibold mb-2">
                                Name
                            </label>
                            <input

                                className="border p-2 rounded w-full"
                                placeholder="Enter Name"
                                {...register("name", { required: "Title is required" })}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                            )}
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-gray-400 font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type='email'
                                className="border p-2 rounded w-full"
                                placeholder="Enter Email"
                                {...register("email", { required: "email is required" })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        {/* Phone */}
                        <div>
                            <label className="block text-gray-400 font-semibold mb-2">
                                Phone
                            </label>
                            <input
                                type='number'
                                className="border p-2 rounded w-full"
                                placeholder="Enter Phone"
                                {...register("phone", { required: "phone number is required" })}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone.message}</p>
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
                                {...register("imageUrl")}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-400 font-semibold mb-2">
                                password
                            </label>
                            <input
                                type='password'
                                className="border p-2 rounded w-full"
                                placeholder="Enter Password"
                                {...register("password", { required: "password is required" })}
                            />

                            {errors.location && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
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

export default StaffUpdate;