import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useBuyer from '../Hooks/useBuyer';

const BuyerRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    const location = useLocation();
    if (loading || isBuyerLoading) {
        return <div className='flex justify-center'><progress className=" mt-14 mx-auto progress progress-info w-56" ></progress></div>
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