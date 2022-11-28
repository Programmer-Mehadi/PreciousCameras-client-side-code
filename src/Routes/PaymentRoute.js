import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import Loading from '../Pages/Shared/Loading/Loading';

const PaymentRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const id = location.pathname.split('/')[3];


    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to='/login' replace></Navigate>;
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

export default PaymentRoute;