import React from 'react';
import { useForm } from 'react-hook-form';
import { TbFidgetSpinner } from 'react-icons/tb';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import axios from 'axios';
import UseAuth from '../../Hooks/UseAuth';
import { useNavigate } from 'react-router';

const ReportAnIssue = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
  Swal.fire({
    title: "Are you sure you want to report this issue?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageApiKey}`,
          formData
        );

        const imageUrl = uploadRes.data.data.display_url;

       
        const issueData = {
          reporterName: user?.displayName || "Anonymous",
          reporterEmail: user?.email || "Not Provided",
          title: data.title,
          description: data.description,
          category: data.category,
          imageUrl: imageUrl,
          location: data.location,
          status: "pending",
          createdAt: new Date(),
        };

     
        await axiosSecure.post("/issues", issueData);

        Swal.fire({
          title: "Reported!",
          text: "Your issue has been reported successfully.",
          icon: "success",
        });
        navigate("/dashboard/my-issue");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  });
};
    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className=" mb-6 bg-linear-to-r from-red-700 to-red-500 text-transparent bg-clip-text text-2xl lg:text-3xl font-bold">Report an Issue !</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                {/* Title */}
                <div>
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
                    <select
                        className="border p-2 rounded w-full"
                        {...register("category", { required: "Category is required" })}
                    >
                        <option value="">Select Category</option>
                        <option>Road Damage</option>
                        <option>Street Light</option>
                        <option>Garbage</option>
                        <option>Water Logging</option>
                        <option>Illegal Parking</option>
                        <option>Others</option>
                    </select>

                    {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category.message}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <input
                        type="file"
                        className="file-input file-input-accent border rounded w-full"
                        {...register("image")}
                    />
                </div>

                {/* Location */}
                <div>
                    <input
                        className="border p-2 rounded w-full"
                        placeholder="Enter Location"
                        {...register("location", { required: "Location is required" })}
                    />

                    {errors.location && (
                        <p className="text-red-500 text-sm">{errors.location.message}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    className="w-full  btn bg-teal-500 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  hover:scale-105 transition ease-in-out rounded-2xl"
                >
                    Submit Issue
                </button>
            </form>
        </div>
    );
};

export default ReportAnIssue;