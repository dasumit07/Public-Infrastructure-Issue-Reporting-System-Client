import React from 'react';
import UseRole from '../Hooks/UseRole';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../Pages/Loading';
import Forbidden from '../Components/Forbidden';

const UserRoute = ({children}) => {
   const { loading } = UseAuth();
    const {role, isLoading} = UseRole()
    if (loading || isLoading) {
        return <Loading></Loading>
    };
    if(role !== 'user'){
        return <Forbidden></Forbidden>
    }
    return children
};

export default UserRoute;