import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['myproducts'],
        queryFn: () => fetch(`http://localhost:5000/myproducts/${user?.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
    })
    return (
        <div>
            <h2 className="text-xl font-bold text-primary text-center py-4">My Products</h2>
            <div>
                {
                    products.length === 0 && <h2 className='text-center text-xl font-semibold'>No Products found.</h2>
                }
                {
                    products.map(product => <div key={product._id}>
                        <h2>{product.name}</h2>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyProducts;