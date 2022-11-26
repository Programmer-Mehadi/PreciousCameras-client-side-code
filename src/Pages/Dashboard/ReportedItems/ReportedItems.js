import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useValidation from '../../../Hooks/useValidation';
import Loading from '../../Shared/Loading/Loading';

const ReportedItems = () => {
    const { user } = useContext(AuthContext);
    const [reportedItems, setreportedItems] = useState(null);
    const [isValidate] = useValidation(user?.email);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_server_api}reporteditems`, {
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => setreportedItems(data))
    }, [reportedItems])
    const deleteProduct = (id) => {

        fetch(`${process.env.REACT_APP_server_api}reportedproductdelete/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setreportedItems(null)
                    toast.success('Delete successfully!');
                }
            })
    }
    if (!reportedItems) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-xl font-bold text-primary text-center py-4">All Reported Items</h2>
            {
                reportedItems && reportedItems.length === 0 && <h2 className='text-center text-xl font-semibold'>No Reported Items Found.</h2>
            }
            {
                reportedItems.length > 0 && <div className="overflow-x-auto text-secondary w-[98%] mx-auto mb-2">
                    <table className="table table-zebra w-full rounded-none">

                        <thead className='rounded-none'>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                reportedItems.map((item, i) =>
                                    <tr key={item._id}>
                                        <th>{i + 1}</th>
                                        <th><img className='h-16 border' src={item.image} alt="" /></th>
                                        <td>{item.name}</td>
                                        <td>{item.resalePrice}tk</td>
                                        <td><button onClick={() => deleteProduct(item._id)} className='btn hover:bg-red-400 outline-red-300 btn-sm bg-red-300 text-red-800'>Delete</button></td>

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

export default ReportedItems;