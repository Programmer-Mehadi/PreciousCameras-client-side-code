import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';

import useAdmin from '../Hooks/useAdmin';
import Loading from '../Pages/Shared/Loading/Loading';


const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }
    if (user && isAdmin === true) {
        return children;
    }
    else {
        return <Navigate to='/' replace></Navigate>
    }
};

export default AdminRoute;