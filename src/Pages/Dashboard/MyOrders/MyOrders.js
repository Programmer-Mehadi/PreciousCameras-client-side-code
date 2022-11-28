import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useValidation from '../../../Hooks/useValidation';
import Loading from '../../Shared/Loading/Loading';


const MyOrders = () => {
    
    const { user } = useContext(AuthContext);
    const [isValidate] = useValidation(user?.email);
    const { data: orders = null, isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: () => fetch(`${process.env.REACT_APP_server_api}orders?email=${user?.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    })

    if (!orders) {
        return <Loading></Loading>
    }

    return (
        <div className='p-4'>
            <h2 className="text-xl font-bold text-primary text-center py-4">My Orders</h2>
            {
                orders && orders.length === 0 && <h2 className='text-center text-xl font-semibold'>No Orders found.</h2>
            }
            {
                orders.length > 0 && <div className="overflow-x-auto text-secondary w-[98%] mx-auto mb-2">
                    <table className="table table-zebra w-full rounded-none">

                        <thead className='rounded-none'>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>TransactionID</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, i) =>
                                    <tr key={order._id}>
                                        <th>{i + 1}</th>
                                        <td> <img src={order?.itemImg} className=" h-12 w-20 border" alt="" /></td>
                                        <td >{order?.itemName
                                        }</td>
                                        <td>{order?.price}tk</td>
                                        {
                                            order?.salesStatus == 'sold' ?
                                                <td className='text-red-600'>{order?.salesStatus}</td> :
                                                <td>{order?.salesStatus}</td>
                                       }
                                        <td>{order?.
                                            transactionId ? order.transactionId : '....'}</td>
                                        {
                                            order?.isPaid
                                                === "yes" ?
                                                <td>
                                                    <button className='btn hover:bg-green-400 outline-green-300 btn-sm bg-green-300 text-green-800'>Paid</button>
                                                </td>
                                                :
                                                <td>
                                                    <Link to={`/dashboard/payment/${order.itemId}`} className={order?.salesStatus === 'sold' ? `btn-disabled btn hover:bg-red-400 outline-red-300 btn-sm bg-red-300 text-red-800` : `btn hover:bg-red-400 outline-red-300 btn-sm bg-red-300 text-red-800`} >Pay</Link></td>
                                        }

                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default MyOrders;