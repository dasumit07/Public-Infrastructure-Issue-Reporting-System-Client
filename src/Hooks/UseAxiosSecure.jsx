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
    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {
            if (!user) {
               
                return config;
            }
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });

        const resInterceptor = axiosSecure.interceptors.response.use(
            res => res,
            err => {
                const statusCode = err.response?.status;
                if (statusCode === 401 || statusCode === 403) {
                    if (user) { 
                        logOutUser().then(() => navigate('/auth/login'));
                    }
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, logOutUser, navigate]);
    return axiosSecure;
};

export default UseAxiosSecure;