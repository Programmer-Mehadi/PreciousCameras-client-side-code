import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {

    const { user } = useContext(AuthContext);
    const { data: products = null, isLoading, refetch } = useQuery({
        queryKey: ['myproducts'],
        queryFn: () => fetch(`http://localhost:5000/myproducts/${user?.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
    })
    if (!products) {

        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-xl font-bold text-primary text-center py-4">My Products</h2>
            <div>
                {
                    !products && products?.length === 0 && <h2 className='text-center text-xl font-semibold'>No Products found.</h2>
                }

                {
                    products?.length > 0 &&
                    <div className="overflow-x-auto text-secondary w-[98%] mx-auto mb-2">
                        <table className="table table-zebra w-full rounded-none">

                            <thead className='rounded-none'>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th >Title</th>
                                    <th>Price</th>
                                    <th>Advertise</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    products?.map((product, i) =>
                                        <tr key={product._id}>
                                            <th>{i + 1}</th>
                                            <td> <img src={product?.image} className="border" alt="" /></td>
                                            <td >{product?.name}</td>
                                            <td>{product?.resalePrice}tk</td>
                                            {
                                                product?.salesStatus === 'available' && product?.advertise === 'no' &&
                                                <td>
                                                    <button className='btn hover:bg-blue-400 outline-blue-300 btn-sm bg-blue-300 text-blue-800'>Make Advertise</button>
                                                </td>
                                            }
                                            {
                                                product?.salesStatus === 'sold' &&
                                                <td>
                                                    <button className='btn hover:bg-secondary outline-green-300 btn-sm bg-secondary text-white'>Sold item</button>
                                                </td>
                                            }
                                            {
                                                product?.salesStatus === 'available' && product?.advertise === 'yes' &&
                                                <td>
                                                    <button className='btn hover:bg-green-400 outline-green-300 btn-sm bg-green-300 text-green-800'>Already Advertise</button>
                                                </td>
                                            }
                                            <td>
                                                <button className='btn hover:bg-red-400 outline-red-300 btn-sm bg-red-300 text-red-800'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div >
    );
};

export default MyProducts;