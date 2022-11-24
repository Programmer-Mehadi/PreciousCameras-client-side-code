import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const adminUl = <>
        <li className='border-b border-slate-600'><a>All Sellers</a></li>
        <li className='border-b border-slate-600'><a>All Buyers</a></li>
        <li className='border-b border-slate-600'><a>Reported Items</a></li>
    </>
    const buyerUl = <>
        <li className='border-b border-slate-600'><a>My Orders</a></li>
    </>
    const sellerUl = <>
        <li className='border-b border-slate-600'><a>Add a product</a></li>
        <li className='border-b border-slate-600'><a>My Products</a></li>
        <li className='border-b border-slate-600'><a>My Orders</a></li>
    </>
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='w-[99%] mx-auto px-5 mt-6'>
                <div className="drawer drawer-mobile gap-4">
                    <input id="drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col bg-secondary rounded text-white">
                        <Outlet></Outlet>

                    </div>
                    <div className="drawer-side bg-secondary rounded">
                        <label htmlFor="drawer" className="drawer-overlay"></label>
                        <ul className="menu  w-80 bg-secondary  text-white">
                        {adminUl}
                        {sellerUl}
                        {buyerUl}

                        </ul>

                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;