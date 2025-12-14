import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import 'animate.css';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import SocialLogIn from '../SocialLogIn';
import Swal from 'sweetalert2';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser, setUser, setLoading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';
  const handleLogin = data => {
    signInUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `🎉 Welcome Back, ${user.displayName || "User"}!`,
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        Swal.fire('No account found with this email. Please sign up first.');
      });

  };
  return (
    <div className="flex items-center justify-center ">
      <div className="border border-orange-50 backdrop-blur-xs shadow-lg rounded-2xl p-8 w-full max-w-md my-8 hover:scale-105 transition ease-in-out duration-1000 animate__animated animate__fadeInDown md:my-8">
        <h1 className="text-3xl font-bold text-center text-gray-400 mb-6">
          Login to <span className="bg-linear-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">CityFix</span>
        </h1>

        <form onSubmit={handleSubmit(handleLogin)}>
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
              placeholder="Enter your password"
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

          <div className="text-right mb-4">
            <p className="text-blue-600 text-sm hover:underline cursor-pointer">

              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full btn bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  hover:scale-105 transition ease-in-out rounded-2xl"
          >
            Login
          </button>
        </form>

        <div className="my-6 text-center text-gray-400 text-sm">---------- or ----------</div>

        <SocialLogIn></SocialLogIn>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            state={location.state}
            to="/auth/register"
            className="text-blue-600 font-semibold hover:underline ">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;