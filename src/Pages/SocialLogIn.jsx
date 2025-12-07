import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import UseAuth from '../Hooks/UseAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const SocialLogIn = () => {
    const { signInGoogle, setUser, setLoading } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';
    const handleGoogleSignIn = () => {
        signInGoogle()
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
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <button onClick={handleGoogleSignIn}
            className="w-full btn bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  hover:scale-105 transition ease-in-out rounded-2xl"
        >
            <FcGoogle />
            <span className=" font-medium">Continue with Google</span>
        </button>
    );
};

export default SocialLogIn;