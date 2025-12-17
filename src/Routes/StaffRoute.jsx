import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import UseRole from '../Hooks/UseRole';
import Loading from '../Pages/Loading';
import Forbidden from '../Components/Forbidden';

const StaffRoute = ({children}) => {
    const { loading } = UseAuth();
    const {role, isLoading} = UseRole()
    if (loading || isLoading) {
        return <Loading></Loading>
    };
    if(role !== 'staff'){
        return <Forbidden></Forbidden>
    }
    return children
};

export default StaffRoute;