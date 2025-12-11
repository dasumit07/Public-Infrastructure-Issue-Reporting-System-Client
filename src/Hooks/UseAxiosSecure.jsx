import axios from 'axios';
import React, { useEffect } from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",

});

const UseAxiosSecure = () => {
    const { user, logOutUser } = UseAuth();
    const navigate = useNavigate();
    console.log(user)
    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        },(err) => {
            const statusCode = err.status;
            if(statusCode === 401 || statusCode === 403){
                logOutUser()
                .then(() =>{
                    navigate('/auth/login');
                })
            }
            return Promise.reject(err);
        })
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    }, [user, logOutUser, navigate])
    return axiosSecure;
};

export default UseAxiosSecure;