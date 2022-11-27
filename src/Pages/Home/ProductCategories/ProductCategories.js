import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const ProductCategories = () => {
   
    const { data: categories = null, isLoading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch(`${process.env.REACT_APP_server_api}categories`)
            .then(res => res.json())
    })

    if (!categories) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-center  p-14 pt-20">All Categories</h2>
            <div className='w-[99%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5'>
                {
                    categories.map((category, i) => <Link to={`/category/${category._id}`} key={category._id} className='btn text-secondary bg-slate-300 border h-[100px] hover:text-white'>{category.name}</Link>)
                }
            </div>
        </div>
    );
};

export default ProductCategories;