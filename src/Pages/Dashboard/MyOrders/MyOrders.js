import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useValidation from '../../../Hooks/useValidation';
import Loading from '../../Shared/Loading/Loading';


const MyOrders = () => {

    const { user } = useContext(AuthContext);
    const [isValidate] = useValidation(user?.email);
    const { data: orders = null, isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: () => fetch(`http://localhost:5000/orders?email=${user?.email}`, {
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
    const orderPaid = (order) => {
        console.log(order)
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
                                <th >Title</th>
                                <th>Price</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                orders.map((order, i) =>
                                    <tr key={order._id}>
                                        <th>{i + 1}</th>
                                        <td> <img src={order?.itemImg} className="border" alt="" /></td>
                                        <td >{order?.itemName
                                        }</td>
                                        <td>{order?.price}tk</td>
                                        {
                                            order?.pay ?
                                                <td>
                                                    <button className='btn hover:bg-green-400 outline-green-300 btn-sm bg-green-300 text-green-800'>Paid</button>
                                                </td>
                                                :
                                                <td>
                                                    <button onClick={() => orderPaid(order)} className='btn hover:bg-red-400 outline-red-300 btn-sm bg-red-300 text-red-800'>Pay</button></td>
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