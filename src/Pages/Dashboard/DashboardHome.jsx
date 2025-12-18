import React from 'react';
import UseRole from '../../Hooks/UseRole';
import Loading from '../Loading';
import AdminDashboardHome from './AdminDashboardHome';
import StaffDashboardHome from './StaffDashboardHome';
import CitizenDashboardHome from './CitizenDashboardHome';

const DashboardHome = () => {
    const { role, isLoading } = UseRole();
    if(isLoading){
        return <Loading></Loading>
    }
    if(role === 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>
    }else if(role === 'staff'){
        return <StaffDashboardHome></StaffDashboardHome>
    }else{
        return <CitizenDashboardHome></CitizenDashboardHome>
    }
};

export default DashboardHome;