import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../Loading';

const AdminProfile = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const [editMode, setEditMode] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm();


    const { data: user, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/profile");
            return res.data;
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: (data) =>


            axiosSecure.patch("/profile", data),
        onSuccess: () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Profile updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
            setEditMode(false);
            queryClient.invalidateQueries(["profile"]);
        }
    });
    useEffect(() => {
        if (user) {
            reset({
                displayName: user.displayName,
                photoURL: user.photoURL
            });
        }
    }, [user, reset]);
    const onSubmit = async (data) => {
        const photoFile = data.image[0];

        const formData = new FormData();
        formData.append("image", photoFile);

        const imgRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageApiKey}`,
            formData
        );

        const photoURL = imgRes.data.data.display_url;
        const updateData = {
            displayName: data?.displayName,
            photoURL: photoURL
        }
        updateProfileMutation.mutate(updateData);
    };
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-xl rounded-2xl animate__animated animate__fadeIn">
            {/* PROFILE HEADER */}
            <div className="flex flex-col items-center gap-4">
                <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-28 h-28 rounded-full border-4 border-teal-500 object-cover"
                />

                <h2 className="text-2xl font-bold flex items-center gap-2">
                    {user.displayName}
                </h2>

               
                <p className=" font-bold">Email: <span className='text-gray-500 '>{user.email}</span></p>
                
            </div>
            <div className="mt-6 space-y-4">
                {editMode ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input
                            {...register("displayName", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Display Name"
                        />

                        <input

                            type="file"
                            className="file-input file-input-accent border rounded w-full"
                            {...register("image")}
                        />

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-success"
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditMode(false)}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setEditMode(true)}
                        className="btn btn-outline btn-primary hover:scale-105 transition ease-in-out"
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;