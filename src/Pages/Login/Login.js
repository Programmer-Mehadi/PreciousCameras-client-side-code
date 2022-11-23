import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

const Login = () => {
    return (
        <div >
            <div className="hero min-h-screen  bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse w-[99%] mx-auto">
                    <div className="card flex-shrink-0  w-[98%] mx-auto max-w-[500px] shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className='text-3xl text-center font-bold'>Login</h2>
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-secondary">Login</button>
                            </div>
                            <div className='mt-3'>
                                <h2>Don't have an account?<Link to='/signup' className='font-semibold ml-1'>Signup</Link></h2>
                            </div>
                            <div className='mt-3'>
                                <button className="btn btn-primary text-white w-full flex gap-2">
                                <FcGoogle className='text-xl'/>    <span>Continue with Google</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;