import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const [currentUser, setCurentUser] = useState(null);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setCurentUser(data))
    }, [user])

    const adminUl = <>
        <li className='border-b border-slate-600'><Link to='/dashboard/allsellers'>All Sellers</Link></li>
        <li className='border-b border-slate-600'><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
        <li className='border-b border-slate-600'><Link to='/dashboard/reporteditems'>Reported Items</Link></li>
    </>;

    const buyerUl = <>
        <li className='border-b border-slate-600'><Link to='/dashboard/myorders'>My Orders</Link></li>
    </>;

    const sellerUl = <>
        <li className='border-b border-slate-600'><Link to='/dashboard/addproduct'>Add a product</Link></li>
        <li className='border-b border-slate-600'><Link to='/dashboard/myproducts'>My Products</Link></li>

    </>
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='w-[99%] mx-auto px-5 mt-6'>
                <div className="drawer drawer-mobile gap-4 h-auto">
                    <input id="drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col bg-secondary rounded text-white">
                        <Outlet></Outlet>

                    </div>
                    <div className="drawer-side bg-secondary rounded">
                        <label htmlFor="drawer" className="drawer-overlay"></label>
                        <ul className="menu  w-80 bg-secondary  text-white">
                            {currentUser !== null && currentUser?.isAdmin && adminUl}
                            { currentUser !== null && currentUser?.type === 'Seller' && currentUser?.isAdmin === false &&   sellerUl}
                            { currentUser !== null && currentUser?.type === 'Buyer' && buyerUl}

                        </ul>

                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;