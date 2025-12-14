import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../Pages/Loading';
import UseRole from '../Hooks/UseRole';
import Forbidden from '../Components/Forbidden';

const AdminRoute = ({children}) => {
    const { loading } = UseAuth();
    const {role, isLoading} = UseRole()
    if (loading || isLoading) {
        return <Loading></Loading>
    };
    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }
    return children
}
export default AdminRoute;