import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
        .then(() => {
        })
        .catch(error => {
            console.log(error.message)
        })
}
  console.log(user);
  const navLinks = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/students">Students</NavLink></li>
    <li><NavLink to="/addStudent">Add Student</NavLink></li>
    <li><NavLink to="/Courses">Courses</NavLink></li>
    <li><NavLink to="/events">Events</NavLink></li>
    <li><NavLink to="/notifications">Notifications</NavLink></li>
    {
      user &&
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://i.ibb.co/ZL86K81/men.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            {user?.email}
          </a>
        </li>
        <li><Link to='/myCourses'>My Course</Link></li>
        <li><Link to='/myevents'>My Events</Link></li>
        
        <li><Link onClick={handleLogOut}>Logout</Link></li>
      </ul>
    </div>
    }
    <li><NavLink to="/Heroregister">Register </NavLink></li>
    <li><NavLink to="/login">Login</NavLink></li>


  </>
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">QeryCraft Explorer</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

    </div>
  );
};

export default Header;