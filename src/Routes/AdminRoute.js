import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';

import useAdmin from '../Hooks/useAdmin';


const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <div className='flex justify-center'><progress className=" mt-14 mx-auto progress progress-info w-56" ></progress></div>
    }
    if (user && isAdmin === true) {
        return children;
    }
    else {
        return <Navigate to='/' replace></Navigate>
    }
};

export default AdminRoute;