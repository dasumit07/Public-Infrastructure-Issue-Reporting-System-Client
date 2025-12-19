import React from 'react';
import UseRole from '../../Hooks/UseRole';
import Loading from '../Loading';
import AdminProfile from './AdminProfile';
import StaffProfile from './StaffProfile';
import CitizenProfile from './CitizenProfile';

const DashboardProfile = () => {
    const { role, isLoading } = UseRole();
    if(isLoading){
        return <Loading></Loading>
    }
    if(role === 'admin'){
        return <AdminProfile></AdminProfile>
    }else if(role === 'staff'){
        return <StaffProfile></StaffProfile>
    }else{
        return <CitizenProfile></CitizenProfile>
    }
};

export default DashboardProfile;