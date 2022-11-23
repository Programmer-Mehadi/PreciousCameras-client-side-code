import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

const Signup = () => {
    return (
        <div>
            <div className="hero min-h-screen  bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse w-[99%] mx-auto">
                    <div className="card flex-shrink-0  w-[98%] mx-auto max-w-[500px] shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className='text-3xl text-center font-bold'>Sign up</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered " />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Image</span>
                                </label>
                                <input type="file" className="pl-0 ml-0 " />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Type</span>
                                </label>
                                <div className='flex gap-4' >
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" name="radio-1" className="radio" />
                                        <span>Buyer</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" name="radio-1" className="radio" />
                                        <span>Seller</span>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-secondary">Signup</button>
                            </div>
                            <div className='mt-3'>
                                <h2>Already have an account?<Link to='/login' className='font-semibold ml-1'>Login</Link></h2>
                            </div>
                            <div className='mt-3'>
                                <button className="btn btn-primary text-white w-full flex gap-2">
                                    <FcGoogle className='text-xl' />    <span>Continue with Google</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;