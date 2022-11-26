import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../.../../../../assets/mainlogo.png';
import { AuthContext } from '../../../Contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const signOut = () => {
        logOut()
            .then(result => toast.success('Logout successfully!'))
            .then(error => console.log(error));
    }
    const navbar = <>
        <li><Link to='/'>Home</Link></li>
        {
            user ? <>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><Link onClick={signOut}>Logout</Link></li>
            </>
                :
                <>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Signup</Link></li>
                </>
        }
    </>
    return (
        <div className='bg-secondary'>
            <div className="navbar  text-white w-[99%] mx-auto">
                <div className="navbar-start">

                    <label htmlFor="drawer" className="pl-2  text-white lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg></label>

                    <Link to='/' className="btn btn-ghost normal-case text-xl "><img className='h-full rounded' src={logo} alt="" /></Link>

                </div>
                <div className="navbar-end ">
                    <ul className='menu menu-horizontal p-0 hidden lg:flex'>{navbar}</ul>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box  ml-[-100px] text-black font-semibold">
                            {navbar}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;