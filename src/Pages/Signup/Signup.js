import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import Loading from "../Shared/Loading/Loading";

import getToken from '../../Hooks/useToken.js';

const Signup = () => {

    const [thisLoading, setThisLoading] = useState(false)
    const navigate = useNavigate();
    const { loading, user, createUser, googleSignupAndLogin, updateUserProfile } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    useEffect(() => {
        if (user) {
            return navigate('/')
        }
    })
    
    const googleSignin = () => {
    
        googleSignupAndLogin()
            .then(result => {
                toast.success('Signin successfully!');
                const userData = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    uid: result.user?.uid,
                    photoURL: result.user?.photoURL,
                    type: "Buyer"
                }
     
                fetch(`${process.env.REACT_APP_server_api}addusers`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data?.acknowledged === true || data?.ownStatus == "Already inserted.") {
                            getToken(userData?.email);
                            setThisLoading(false);
                            navigate('/');
                        }
                    })
            })
            .then(error => {
                setError(error.code);
                setThisLoading(false);
            })
    }
    const handleSignup = (data) => {
        setThisLoading(true);
        const img = data.image[0];
      
        createUser(data.email, data.password)
            .then(result => {
                setError(null)
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
                            updateUserProfile(data.name, imgUrl)
                                .then(res => {
                                
                                    toast.success('Create user successfully!');
                                    const userData = {
                                        name: result?.user?.displayName,
                                        email: result?.user?.email,
                                        uid: result?.user?.uid,
                                        photoURL: result?.user?.photoURL,
                                        type: data?.userType
                                    }
                                    fetch(`${process.env.REACT_APP_server_api}addusers`, {
                                        method: 'POST',
                                        headers: {
                                            'content-type': 'application/json'
                                        },
                                        body: JSON.stringify(userData)
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.acknowledged === true || "Already inserted.") {
                                                getToken(userData?.email);
                                                toast.success('Signin successfully!');
                                                setThisLoading(false);
                                                return navigate('/');
                                            }
                                        })

                                })
                                .catch(error => setThisLoading(false))
                        }
                    })

            })
            .catch(error => {
                setError(error.code);
                setThisLoading(false);
            })
    }
    return (
        <div>
            <div className="hero py-6  bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse w-[99%] mx-auto">
                    <div className="card flex-shrink-0  w-[98%] mx-auto max-w-[500px] shadow-2xl bg-base-100">
                        {
                            thisLoading ? <Loading /> : ''
                        }
                        <form className="card-body " onSubmit={handleSubmit(handleSignup)}>
                            <h2 className='text-3xl text-center font-bold'>Sign up</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered " {...register("name", { required: "Name is required" })} />
                                {
                                    errors.name && <p className='text-red-500 my-1'>{errors.name.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: "Email is required" })} />
                                {
                                    errors.email && <p className='text-red-500 my-1'>{errors.email.message}*</p>
                                }
                                {
                                    error && <p className='text-red-500 my-1'>{error}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" {...register("password", {
                                    required: "Password is required", minLength: 6
                                })} />
                                {
                                    errors.password && <p className='text-red-500 my-1'>{errors.password.message}</p>
                                }
                                {errors.password && errors.password.type === "minLength" && <p className='text-red-500 my-1'>Password length atleast 6 characters.</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Image</span>
                                </label>
                                <input type="file" className="pl-0 ml-0" {...register("image", { required: "Image is required" })} />
                                {
                                    errors.image && <p className='text-red-500 my-1'>{errors.image.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Type</span>
                                </label>
                                <div className='flex gap-4' >
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" name="radio-1" className="radio" {...register("userType", { required: "User type is required" })} value="Buyer" checked/>
                                        <span>Buyer</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" name="radio-1" className="radio" {...register("userType", { required: "User type is required" })} value="Seller" />
                                        <span>Seller</span>
                                    </div>
                                    {
                                        errors.userType && <p className='text-red-500 my-1'>{errors.userType.message}*</p>
                                    }

                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-secondary">Signup</button>
                            </div>
                            <div className='mt-3'>
                                <h2>Already have an account?<Link to='/login' className='font-semibold ml-1'>Login</Link></h2>
                            </div>
                            <div className='mt-3'>
                                <p onClick={googleSignin} className="btn btn-primary text-secondary w-full flex gap-2">
                                    <FcGoogle className='text-xl bg-white rounded-full' />    <span>Continue with Google</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;