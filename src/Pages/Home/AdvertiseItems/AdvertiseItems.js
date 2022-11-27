import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Loading from '../../Shared/Loading/Loading';

const AdvertiseItems = () => {

    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { data: items = null, isLoading, refetch } = useQuery({
        queryKey: ['advertiseditems'],
        queryFn: () => fetch(`${process.env.REACT_APP_server_api}advertiseditems`)
            .then(res => res.json())
    })

    if (!items) {
        return <Loading></Loading>
    }
    const setBookingProduct = (product) => {

        if (!user) {
            console.log(product);
            return <Navigate to='/login' state={{ form: location }} replace></Navigate>;
        }
    }
    const reportProduct = (product) => {
        const data = { itemId: product?._id, userEmail: user?.email, userName: user?.displayName };
        fetch(`${process.env.REACT_APP_server_api}reporttoadmin/${product?._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.ownStatus) {
                    toast.success(data.ownStatus)
                }
                else {
                    toast.success('Successfully reported!')
                }
            })
    }
    return (
        <div className="px-5 w-[99%] mx-auto py-14">
            <h2 className="text-2xl font-bold text-center pt-20">Advertise Items</h2>
            <div className='py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    items.map(product =>
                        <div key={product._id} className="card bg-slate-50 ">
                            <figure className='rounded'><img className='border h-[20rem] w-full rounded' src={product.image} alt="Shoes" /></figure>
                            <div className="card-body  ">
                                <h2 className="card-title text-primary">
                                    {product.name}
                                </h2>
                                <p className="text-xl font-semibold flex items-center">{product.userName}
                                    {product.verify === true && <FaCheckCircle className="text-blue-600 text-xl ml-1" />}
                                </p>
                                <p>Published: {product.date}</p>
                                <div className="overflow-x-auto  text-center  grid grid-cols-1">
                                    <div className="grid grid-cols-2 ">
                                        <p className="border-2">Resale Price : </p>
                                        <p className="border-2 border-l-0">{product.resalePrice}</p>
                                    </div>
                                    <div className="grid grid-cols-2 ">
                                        <p className="border-2">Original Price : </p>
                                        <p className="border-2 border-l-0">{product.originalPrice}</p>
                                    </div>
                                    <div className="grid grid-cols-2 ">
                                        <p className="border-2">Purchase Year : </p>
                                        <p className="border-2 border-l-0">{product.purchaseYear}</p>
                                    </div>

                                    <div className="grid grid-cols-2 ">
                                        <p className="border-2">
                                            Condition Type : </p>
                                        <p className="border-2 border-l-0">{product.conditionType
                                        }</p>
                                    </div>

                                    <div className="grid grid-cols-2">
                                        <p className="border-2">
                                            Phone : </p>
                                        <p className="border-2 border-l-0">{product.phone}</p>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <p className="border-2">
                                            Location : </p>
                                        <p className="border-2 border-l-0">{product.
                                            location}</p>
                                    </div>

                                </div>

                                <div className="card-actions justify-center">
                                    <label onClick={() => setBookingProduct(product)} htmlFor="my-modal-3" className="btn btn-primary w-full rounded-3xl font-bold">Book now<FaShoppingCart className='ml-2 text-md' /></label>
                                </div>
                                <div className="card-actions justify-center">
                                    <label onClick={() => reportProduct(product)} className="btn hover:bg-red-300 bg-red-400 text-red-700 w-full rounded-3xl font-bold">Report to admin </label>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AdvertiseItems;