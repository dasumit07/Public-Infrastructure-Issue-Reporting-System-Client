import React from 'react';
import { useForm } from 'react-hook-form';
import { PiUserCirclePlus } from 'react-icons/pi';
import UseAuth from '../../Hooks/UseAuth';
import axios from 'axios';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import StaffUpdate from '../../Hooks/StaffUpdate';
import StaffDelete from '../../Hooks/StaffDelete';

const ManageStaff = () => {
    const { registerUser, setLoading, updateUserProfile } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: staffs = [], refetch } = useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staffs');
            return res.data;
        }
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const handleStaff = async (data) => {
        try {
            const photoFile = data.image[0];

            await registerUser(data.email, data.password);

            const formData = new FormData();
            formData.append("image", photoFile);

            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageApiKey}`,
                formData
            );

            const photoURL = imgRes.data.data.display_url;

            const staffInfo = {
                email: data.email,
                phone: data.phone,
                name: data.name,
                photoURL,
                password: data.password
            };

            await axiosSecure.post("/staff", staffInfo);

            await updateUserProfile({
                displayName: data.name,
                photoURL,
            });
            
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Staff added successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to add staff");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <button
                onClick={() => {
                    document.getElementById('add_staff_modal').showModal();
                }}
                className="px-4 bg-blue-500 hover:bg-linear-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center gap-1 m-5"
            >
                <PiUserCirclePlus /> <span>Add Staff</span>
            </button>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        staffs.map((staff, i) => <tbody key={staff._id}>
                            {/* row 1 */}
                            <tr>
                                <td>{i+1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={staff.photoURL}
                                                    alt={staff.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{staff.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{staff.email}</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{staff.phone}</div>
                                    </div>
                                </td>
                                <td className='flex gap-2'>
                                    <StaffUpdate refetch={refetch} staff={staff}></StaffUpdate>
                                    <StaffDelete refetch={refetch} staff={staff}></StaffDelete>
                                </td>

                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
            <dialog id="add_staff_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-2xl text-center mb-6 bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text">
                        Add Staff
                    </h3>

                    <form onSubmit={handleSubmit(handleStaff)} className="space-y-4">

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
                                {...register("image")}
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
                                onClick={() => document.getElementById('add_staff_modal').close()}
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

export default ManageStaff;