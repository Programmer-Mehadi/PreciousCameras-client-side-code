import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const CategoryProduct = () => {
    const products = useLoaderData();
    const [categoryName, setCategoryName] = useState('')
    useEffect(() => {
        const id = products[0].category;
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                data.map(d => {
                    if (d._id === id) {
                        setCategoryName(d.name);
                    }
                })
            })
    }, [products])
    console.log(products);
    return (
        <div className='px-5 w-[99%] mx-auto py-14'>
            <h2 className='text-center text-secondary text-2xl font-bold pb-4' > {categoryName}</h2>
            <h2 className='text-center text-primary text-2xl font-bold' >Products found : {products.length}</h2>
            <div className='py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map(product =>
                        <div key={product._id} className="card bg-slate-50 ">
                            <figure className='rounded'><img className='border h-[20rem] w-full rounded' src={product.image} alt="Shoes" /></figure>
                            <div className="card-body  ">
                                <h2 className="card-title text-primary">
                                    {product.name}
                                </h2>
                                <p className="text-xl font-semibold">{product.userName}</p>
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
                                    <div className="btn btn-primary w-full rounded-3xl font-bold">Book now<FaShoppingCart className='ml-2 text-md' /></div>

                                </div>
                            </div>
                        </div>

                    )
                }
            </div>

        </div>
    );
};

export default CategoryProduct;