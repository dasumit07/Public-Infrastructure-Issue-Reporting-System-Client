import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../Pages/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
const { user, loading } = UseAuth();
const location = useLocation();
if (loading) {
    return <Loading></Loading>
    };
    if(!user){
    return <Navigate to="/auth/login"
        state={{ from: location }}
        replace></Navigate>
};
    return children;
};

export default PrivateRoute;