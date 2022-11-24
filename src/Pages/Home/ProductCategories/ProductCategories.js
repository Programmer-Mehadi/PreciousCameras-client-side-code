import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ProductCategories = () => {
    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch(`http://localhost:5000/categories`)
            .then(res => res.json())
    })
    return (
        <div>
            <h2 className="text-2xl font-bold text-center p-14">All Categories</h2>
            <div className='w-[99%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5'>
                {
                    categories.map(category => <div key='category._id' className='btn text-secondary bg-slate-300 border h-[100px] hover:text-white'>{category.name}</div>)
                }
            </div>
        </div>
    );
};

export default ProductCategories;