import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';


const AllBuyers = () => {

    const { user, deleteUserData } = useContext(AuthContext);
    const [buyers, setBuyers] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/allbuyers/${user?.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setBuyers(data))
    }, [buyers])

    const deleteUser = (id) => {
        fetch(`http://localhost:5000/userDelete/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    deleteUserData(user)
                        .then(res => {
                            console.log(res);
                            toast.success('Delete successfully!');
                        })
                        .then(error => console.log(error))
                }
            })
    }

    if (!buyers) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-primary text-center py-4">All Buyers</h2>
            {
                buyers && buyers.length === 0 && <h2 className='text-center text-xl font-semibold'>No Buyers found.</h2>
            }
            {
                buyers.length > 0 && <div className="overflow-x-auto text-secondary w-[99%] mx-auto mb-2">
                    <table className="table table-zebra w-full rounded-none">

                        <thead className='rounded-none'>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                buyers.map((buyer, i) =>
                                    <tr key={buyer._id}>
                                        <th>{i + 1}</th>
                                        <td>{buyer.name}</td>
                                        <td>{buyer.email}</td>
                                        <td>{buyer.type}</td>
                                        <td><button onClick={() => deleteUser(buyer._id)} className='btn hover:bg-red-400 outline-red-300 btn-sm bg-red-300 text-red-800'>Delete</button></td>
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

export default AllBuyers;