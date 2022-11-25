import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';


const CategoryProduct = () => {
    const { user, logOut } = useContext(AuthContext)
    const products = useLoaderData();

    const [categoryName, setCategoryName] = useState('')
    const [bookingProduct, setBookingProduct] = useState(null);
    useEffect(() => {

        if ((products?.name)?.length > 0) {
            setCategoryName(products?.name);
        }
        else {
            const id = products[0]?.category;
            fetch('http://localhost:5000/categories')
                .then(res => res.json())
                .then(data => {
                    data.map(d => {
                        if (d._id === id) {
                            setCategoryName(d.name);
                        }
                    })
                })
        }

    }, [products])

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const customerName = user?.displayName;
        const customerEmail = user?.email;
        const itemName = form.itemName.value;
        const price = form.price.value;
        const phoneNumber = form.phoneNumber.value;
        const location = form.location.value;
        const itemId = bookingProduct._id;
        const itemImg = bookingProduct.image;
        const bookingData = {
            customerName,
            customerEmail,
            itemId,
            itemName,
            itemImg,
            price,
            phoneNumber,
            location
        }
        fetch('http://localhost:5000/addbooking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(bookingData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Item Book Comfirm Successfully!');
                    setBookingProduct(null);
                }
                if (data?.status === 'Forbidden' || data?.status === 'unauthorized access') {
                    logOut()
                        .then(res => toast.success('Logout Successfully! please login again.'))
                        .then(error => console.log(error))
                }
            })

    }

    return (
        <div className='px-5 w-[99%] mx-auto py-14'>
            <h2 className='text-center text-secondary text-2xl font-bold pb-4' > {categoryName}</h2>
            {
                products?.name ? <h2 className='text-center text-primary text-2xl font-bold' >Products found : 0</h2> :
                    <h2 className='text-center text-primary text-2xl font-bold' >Products found : {products?.length}</h2>
            }

            <div className='py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    !products?.name && products.map(product =>
                        <div key={product._id} className="card bg-slate-50 ">
                            <figure className='rounded'><img className='border h-[20rem] w-full rounded' src={product.image} alt="Shoes" /></figure>
                            <div className="card-body  ">
                                <h2 className="card-title text-primary">
                                    {product.name}
                                </h2>
                                <p className="text-xl font-semibold flex items-center">{product.userName}
                                    {product.verify === true && <FaCheckCircle className="text-blue-600 text-xl ml-1" />}
                                </p>
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

                                    <label onClick={() => setBookingProduct(product)} htmlFor="my-modal-3" className="btn btn-primary w-full rounded-3xl font-bold">Book now<FaShoppingCart className='ml-2 text-md' /></label>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {
                bookingProduct && <div className="modal-section">
                    <input type="checkbox" id="my-modal-3" className="modal-toggle h-auto" />
                    <div className="modal h-auto">
                        <div className="modal-box relative h-auto">
                            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-lg font-bold">{bookingProduct?.name}</h3>
                            <form className="h-auto" onSubmit={handleBooking}>
                                <div className="hero-content flex-col lg:flex-row-reverse">
                                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                                        <div className="card-body">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Name</span>
                                                </label>
                                                <input name="customerName" value={user?.displayName} type="text" placeholder="name" className="input input-bordered" readOnly />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Email</span>
                                                </label>
                                                <input name='customerEmail' value={user?.email} type="email" placeholder="email" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Item name</span>
                                                </label>
                                                <input name="itemName" value={bookingProduct?.name} type="text" placeholder="item name" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Price</span>
                                                </label>
                                                <input name="price" value={bookingProduct?.resalePrice} type="text" placeholder="price" className="input input-bordered" />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Phone number</span>
                                                </label>
                                                <input name="phoneNumber" type="text" placeholder="phone number" className="input input-bordered" required />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Meeting location</span>
                                                </label>
                                                <input name="location" type="text" placeholder="meeting location" className="input input-bordered" required />
                                            </div>

                                            <div className="form-control mt-6">
                                                <input type="submit" className="btn btn-primary" value="Submit" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default CategoryProduct;