import React from 'react';
import { FaClipboardList, FaHome, FaTachometerAlt, FaTasks, FaUsersCog } from 'react-icons/fa';
import { MdPayment, MdReportProblem, MdSyncProblem } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import { FaUsersGear } from "react-icons/fa6";
import UseRole from '../Hooks/UseRole';

const DashBoardLayout = () => {
  const { role } = UseRole();
  return (
    <div className="drawer lg:drawer-open w-11/12 mx-auto min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-linear-to-r from-white to-teal-800 ">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4"><Link to={"/"}><p className='bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text text-2xl lg:text-3xl font-bold'>CityFix</p></Link></div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>

      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <li>
              <NavLink to={"/"} className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-1" data-tip="Home Page"><FaHome size={20} /><span className="is-drawer-close:hidden">Home Page</span></button></NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard"} end className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-1" data-tip="Dashboard"><FaTachometerAlt size={20} /><span className="is-drawer-close:hidden">Dashboard</span></button></NavLink>
            </li>

            {/* users only routes */}
            {
              role === 'user' ? <>
              <li>
              <NavLink to={"/dashboard/report-issue"} className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-1" data-tip="Report Issue"><MdReportProblem size={20} /><span className="is-drawer-close:hidden">Report Issue</span></button></NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/my-issue"} className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-1" data-tip="My Issue"><MdSyncProblem size={22} /><span className="is-drawer-close:hidden">My Issue</span></button></NavLink>
            </li></> : <></>
            }
            

            
            {/* staff only routes */}
            {
              role === 'staff' ? <>
              <li>
              <NavLink to={"/dashboard/assigned-issues"} className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-1" data-tip="Assigned issues"><FaTasks size={22} /><span className="is-drawer-close:hidden">Assigned issues</span></button></NavLink>
            </li></> : <></>
            }
            {/* admin only routes */}
            {
              role === 'admin' ? <>
                <li>
                  <NavLink to={"/dashboard/all-issues"} className={({ isActive }) =>
                    `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                    }`}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-1" data-tip="All Issues"><FaClipboardList size={22} /><span className="is-drawer-close:hidden">All Issues</span></button></NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/payment-history"} className={({ isActive }) =>
                    `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                    }`}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-1" data-tip="Payment History"><MdPayment size={22} /><span className="is-drawer-close:hidden">Payment History</span></button></NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/manage-users"} className={({ isActive }) =>
                    `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                    }`}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-1" data-tip="Manage users"><FaUsersGear size={22} /><span className="is-drawer-close:hidden">Manage users</span></button></NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/manage-staff"} className={({ isActive }) =>
                    `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                    }`}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-1" data-tip="Manage Staff"><FaUsersCog size={22} /><span className="is-drawer-close:hidden">Manage Staff</span></button></NavLink>
                </li></> : <></>
            }

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;