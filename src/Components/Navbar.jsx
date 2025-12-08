
import { Link, NavLink } from 'react-router';
import { LuLogIn } from 'react-icons/lu';
import UseAuth from '../Hooks/UseAuth';
import { MoonLoader } from 'react-spinners';





const Navbar = () => {
  const { user, logOutUser, loading } = UseAuth();
  const handleLogOut = () => {
    logOutUser()
      .then(() => { })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <div className="navbar fixed top-0 left-0 w-full z-50  shadow-sm mx-auto backdrop-blur-lg bg-white/30 border border-white/40 rounded-2xl">
      <div className='w-11/12 mx-auto flex'>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <NavLink to={"/"} className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`}>Home</NavLink>
              <NavLink to={"all-issues"} className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`}>All Issues</NavLink>
              <NavLink to={'dashboard/report-issue'} className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`}>Report Issue</NavLink>
              <NavLink to={"about-us"} className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`}>About Us</NavLink>
            </ul>
          </div>
          <NavLink to={"/"} className={'flex'} ><img className='h-12' src="https://i.ibb.co.com/qFXc5nG2/17871683.png" alt="" /><p className='bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text text-2xl lg:text-3xl font-bold'>CityFix</p></NavLink>
        </div>
        <div className="navbar-end flex items-center gap-3">
          <ul className="menu menu-horizontal px-1 gap-5 items-center hidden lg:flex">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"all-issues"}
              className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`
              }
            >
              All Issues
            </NavLink>

            <NavLink
              to={'dashboard/report-issue'}
              className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`
              }
            >
              Report Issue
            </NavLink>

            <NavLink
              to={"about-us"}
              className={({ isActive }) =>
                `hover:scale-105 transition ease-in-out ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-400'
                }`
              }
            >
              About Us
            </NavLink>
          </ul>
          {loading ? <MoonLoader size={30} /> : user ?
            <div className='flex items-center gap-1 md:gap-4'>

              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="m-1"><img
                  src={user.photoURL ? user.photoURL : "https://via.placeholder.com/88"}
                  alt='avatar'
                  className='h-12 w-12 rounded-full hover:scale-105 transition ease-in-out duration-500'
                /></div>
                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li className='bg-linear-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text font-bold '> {user.displayName}</li>
                  <li className='bg-linear-to-r from-teal-400 to-teal-300 text-transparent bg-clip-text font-semibold mb-3'>{user.email}</li>
                  <Link to={"/dashboard"}><li><button className="btn bg-teal-500 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  hover:scale-105 transition ease-in-out rounded-2xl mb-2">Dashboard</button></li></Link>
                  <li><button onClick={handleLogOut} className="btn bg-teal-500 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  hover:scale-105 transition ease-in-out rounded-2xl ">
                    <LuLogIn />
                    LogOut
                  </button></li>
                </ul>

              </div>

            </div> : <Link to={"/auth/login"}>
              <button className="btn bg-teal-500 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold  hover:scale-105 transition ease-in-out rounded-2xl">
                <LuLogIn />
                Login
              </button></Link>}


        </div>


      </div>
    </div>

  );
};

export default Navbar;