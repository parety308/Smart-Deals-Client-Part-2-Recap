import { use } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import pimg from '../../assets/thumb-profile.png'
import { BiLogOut } from 'react-icons/bi';
const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();
  const links = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/allproducts'>All Products</NavLink></li>
    <li><NavLink to='/myproducts'>My Products</NavLink></li>
    <li><NavLink to='/mybids'>My Bids</NavLink></li>
    <li><NavLink to='/createAProduct'>Create Product</NavLink></li>
  </>
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast('sign out successfully');
        navigate('/login');
      })
      .catch(error => console.log(error));

  }
  return (
    <div className="navbar bg-base-100 shadow-sm  px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-xl font-semibold">
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-3xl font-semibold">SmartDeals</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-xl font-semibold">
          {links}
        </ul>
      </div>

      <div className="navbar-end flex gap-4">
        {
          user ? <div className='flex justify-center items-center gap-2'>  <div className="dropdown dropdown-  ">
            <img tabIndex={0} role='button' className='w-10 rounded-full h-10' src={`${user?.photoURL||pimg}`} alt="" />
            <ul tabIndex="-1" className="dropdown-content menu  z-1 w-52 p-2 ">
              <li className='font-semibold text-xl'>{user.displayName}</li>
            </ul></div> <button onClick={handleSignOut} className={`btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-lg text-white font-semibold`}><BiLogOut /> Signout</button> </div> : 
            <div className='flex gap-4'><NavLink to='/login' className="btn  border-[#9F62F2] text-xl font-semibold">Login</NavLink>
            <NavLink to='/register' className={`btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-lg text-white font-semibold`}>Register</NavLink></div>
        }
      </div>
    </div>
  );
};

export default Navbar;