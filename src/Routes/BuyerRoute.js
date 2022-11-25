import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useBuyer from '../Hooks/useBuyer';
import Loading from '../Pages/Shared/Loading/Loading';

const BuyerRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    const location = useLocation();
    if (loading || isBuyerLoading) {
        return  <Loading></Loading>
    }
    if (user && isBuyer === true) {
        return children;
    }
    else {
        if (user) {
            return <Navigate to='/dashboard' replace></Navigate>
        }
        else {
            return <Navigate to='/' replace></Navigate>
        }
    }
};

export default BuyerRoute;