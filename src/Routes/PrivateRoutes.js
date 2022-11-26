import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import Loading from '../Pages/Shared/Loading/Loading';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return  <Loading></Loading>
    }
    if (!user) {
        return <Navigate to='/login' state={{ form: location }} replace></Navigate>;
    }
    return children;


    // if (user) {
    //     return children;
    // }
    // else if (loading) {
    //     return  <Loading></Loading>
    // }
    // else {
    //     return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    // }
};

export default PrivateRoutes;