import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';


const AddProduct = () => {
    const [thisLoading, setThisLoading] = useState(false)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    const navigate = useNavigate();
    const { loading, user } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    function make2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            date.getFullYear(),
            make2Digits(date.getMonth() + 1),
            make2Digits(date.getDate()),
        ].join('-');
    }

    const handleAdd = (data) => {
        const date = formatDate(new Date());
        data['date'] = date;
        data['email'] = user?.email;
        setThisLoading(true);
        console.log(data)
        const img = data.image[0];
        const formData = new FormData();
        let imgUrl = '';
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(imgbb => {
                if (imgbb.success) {
                    imgUrl = imgbb.data.display_url;
                    data['image'] = imgUrl;
                    fetch('http://localhost:5000/addproduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `barer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.acknowledged) {
                                toast.success('Product added successfully!')
                                navigate('/dashboard/myproducts')
                            }
                        })
                }
            })
    }
    return (
        <div className='p-4 h-full'>
            <h2 className="text-xl font-bold text-primary text-center py-4"> Add A New Product</h2>
            <div className="hero pb-8 ">
                <div className="hero-content flex-col  w-[99%] mx-auto">
                    <div className="card flex-shrink-0  w-[98%] mx-auto max-w-[500px] shadow-2xl bg-base-100 text-black">
                        {
                            thisLoading ? <Loading /> : ''
                        }
                        <form className="card-body" onSubmit={handleSubmit(handleAdd)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered text-secondary" {...register("name", { required: "Name is required" })} />
                                {
                                    errors.name && <p className='text-red-500 my-1'>{errors.name.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Resale Price</span>
                                </label>
                                <input type="number" placeholder="resale price" className="input input-bordered text-secondary " {...register("resalePrice", { required: "Resale Price is required" })} />
                                {
                                    errors.resalePrice && <p className='text-red-500 my-1'>{errors.resalePrice.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Original Price</span>
                                </label>
                                <input type="number" placeholder="original price" className="input input-bordered text-secondary" {...register("originalPrice", { required: "Original Price is required" })} />
                                {
                                    errors.originalPrice && <p className='text-red-500 my-1'>{errors.originalPrice.message}*</p>
                                }
                            </div>
                            {/* condition type(excellent, good, fair) */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Condition Type</span>
                                </label>
                                <div className='flex gap-4 text-secondary' >
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" name="condition" className="radio" {...register("conditionType", { required: "Condition type is required" })} value="Excellent" />
                                        <span>Excellent</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" name="condition" className="radio" {...register("conditionType", { required: "Condition type is required" })} value="Good" />
                                        <span>Good</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" name="condition" className="radio" {...register("conditionType", { required: "Condition type is required" })} value="Fair" />
                                        <span>Fair</span>
                                    </div>

                                </div>
                                {
                                    errors.conditionType && <p className='text-red-500 my-1 block'>{errors.conditionType.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mobile Number</span>
                                </label>
                                <input type="phone" placeholder="phone" className="input input-bordered text-secondary" {...register("phone", { required: "Phone is required" })} />
                                {
                                    errors.phone && <p className='text-red-500 my-1'>{errors.phone.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input type="text" placeholder="location" className="input input-bordered text-secondary" {...register("location", { required: "Location is required" })} />
                                {
                                    errors.location && <p className='text-red-500 my-1 '>{errors.location.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Year of Purchase</span>
                                </label>
                                <input type="number" placeholder="year of purchase" className="input input-bordered text-secondary " {...register("purchaseYear", { required: "Purchase year is required" })} />
                                {
                                    errors.purchaseYear && <p className='text-red-500 my-1'>{errors.purchaseYear.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select className="select select-bordered w-full max-w-xs" {...register("category", { required: "Category is required" })} >
                                    {
                                        categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                                    }
                                </select>

                                {
                                    errors.category && <p className='text-red-500 my-1'>{errors.category.message}*</p>
                                }
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Image</span>
                                </label>
                                <input type="file" className="pl-0 ml-0" {...register("image", { required: "Image is required" })} />
                                {
                                    errors.image && <p className='text-red-500 my-1'>{errors.image.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea type="text" placeholder="description" className="input input-bordered text-secondary" {...register("description", { required: "Description is required" })} />
                                {
                                    errors.description && <p className='text-red-500 my-1'>{errors.description.message}*</p>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary text-black">Add product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;