import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const signOut = () => {
        logOut()
            .then(result => console.log(result))
            .then(error => console.log(error));
    }
    const navbar = <>
        <li><Link to='/'>Home</Link></li>
        {
            user ? <li><Link onClick={logOut}>Logout</Link></li>
                :
                <>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Signup</Link></li>
                </>
        }
    </>
    return (
        <div className='bg-primary'>
            <div className="navbar  text-white w-[99%] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <a className="btn btn-ghost normal-case text-xl">PreciousCameras</a>
                    </div>
                </div>
                <div className="navbar-end ">
                    <ul className='menu menu-horizontal p-0 hidden lg:flex'>{navbar}</ul>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box  ml-[-100px]">
                            {navbar}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;