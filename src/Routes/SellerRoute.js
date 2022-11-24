import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useSeller from '../Hooks/useSeller';



const SellerRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();
    if (loading || isSellerLoading) {
        return <div className='flex justify-center'><progress className=" mt-14 mx-auto progress progress-info w-56" ></progress></div>
    }
    if (user && isSeller === true) {
        return children;
    }
    else {
        return <Navigate to='/' replace></Navigate>
    }
};

export default SellerRoute;