import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useValidation from '../../../Hooks/useValidation';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
    const { user } = useContext(AuthContext);
    const [sellers, setSellers] = useState(null);
    const [isValidate] = useValidation(user?.email);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_server_api}allsellers/${user?.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setSellers(data))
    }, [sellers])
    const deleteUser = (id) => {
        fetch(`${process.env.REACT_APP_server_api}userDelete/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Delete from mongodb successfully!');
                }
            })
    }
    const verifyUser = (id) => {
        fetch(`${process.env.REACT_APP_server_api}userverify/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Update verify successfully!');
                }
            })
    }
    if (!sellers) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-xl font-bold text-primary text-center py-4">All Sellers</h2>
            {
                sellers && sellers.length === 0 && <h2 className='text-center text-xl font-semibold'>No Sellers Found.</h2>
            }
            {
                sellers.length > 0 && <div className="overflow-x-auto text-secondary w-[98%] mx-auto mb-2">
                    <table className="table table-zebra w-full rounded-none">

                        <thead className='rounded-none'>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Verify</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                sellers.map((seller, i) =>
                                    <tr key={seller._id}>
                                        <th>{i + 1}</th>
                                        <td><img className='h-12 w-12 border-2 border-blue-500 rounded-[50%]' src={seller.photoURL}  alt="" /></td>
                                        <td>{seller.name}</td>
                                        <td>{seller.email}</td>
                                        <td>{seller.type}</td>
                                        <td>{
                                            !seller.verify ? <button onClick={() => verifyUser(seller._id)} className='btn hover:bg-green-400 outline-green-300 btn-sm bg-green-300 text-green-800'>Verify</button>
                                        : <p className='text-green-500 text-base'>Verified</p>
                                        }</td>
                                        <td><button onClick={() => deleteUser(seller._id)} className='btn hover:bg-red-400 outline-red-300 btn-sm bg-red-300 text-red-800'>Delete</button></td>
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

export default AllSellers;