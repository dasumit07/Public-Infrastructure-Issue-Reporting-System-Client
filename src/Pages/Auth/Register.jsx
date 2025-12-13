import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import SocialLogIn from '../SocialLogIn';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, setUser, setLoading, updateUserProfile } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';
  const axiosSecure = UseAxiosSecure();
  const handleRegister = data => {
    const photoFile = data.photoURL[0];
    registerUser(data.email, data.password)
      .then(result => {
        const formData = new FormData();
        formData.append('image', photoFile);
        axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_imageApiKey}`, formData)
          .then(response => {
            const photoURL = response.data.data.display_url;
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL
            }
            axiosSecure.post('/users', userInfo)

            const userProfile = {
              displayName: data.name,
              photoURL: photoURL
            }
            updateUserProfile(userProfile)
              .then(() => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `🎉 Welcome, ${user.displayName || "User"}!`,
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate(from);
                setUser(user);
                setLoading(false);
              })
              .catch(() => {
                toast.error("Failed to update profile.");
              })
          }).catch(error => {
            console.log('Image upload error:', error);
          });
        const user = result.user;
        setUser(user);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <div className="flex items-center justify-center">
      <div className="border border-orange-50 backdrop-blur-xs shadow-lg rounded-2xl p-8 w-full max-w-md hover:scale-105 transition ease-in-out duration-1000 animate__animated animate__fadeInDown md:my-8">
        <h1 className="text-3xl font-bold text-center text-gray-400 mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4">
            <label className="block text-gray-400 font-semibold mb-2">
              Full Name
            </label>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"

            />
            {errors.name?.type === 'required' && <span className="text-red-500 text-sm">Name is required</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 font-semibold mb-2">
              Photo URL
            </label>
            <input
              {...register('photoURL', { required: true })}
              type="file"
              placeholder="Enter your photo URL"
              className="file-input file-input-accent w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"

            />
            {errors.photoURL?.type === 'required' && <span className="text-red-500 text-sm">Photo URL is required</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 font-semibold mb-2">
              Email
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"

            />
            {errors.email?.type === 'required' && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-400 font-semibold mb-2">
              Password
            </label>
            <input
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.password?.type === 'required' && <span className="text-red-500 text-sm">Password is required</span>}
            {errors.password?.type === 'minLength' && <span className="text-red-500 text-sm">Password must be at least 6 characters</span>}
            {errors.password?.type === 'pattern' && <span className="text-red-500 text-sm">Password must contain at least one uppercase and one lowercase letter</span>}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full  btn bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  hover:scale-105 transition ease-in-out rounded-2xl"
          >
            Register
          </button>
        </form>

        <div className="my-6 text-center text-gray-400 text-sm">---------- or ----------</div>

        <SocialLogIn></SocialLogIn>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/auth/login"
            className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;