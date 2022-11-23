import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import Loading from "../Shared/Loading/Loading";
const Login = () => {
    const [thisLoading, setThisLoading] = useState(false)
    const navigate = useNavigate();
    const { loading, user, googleSignupAndLogin, signIn } = useContext(AuthContext);
    useEffect(() => {
        if (user) {
            return navigate('/')
        }
    }, [user])
    const [error, setError] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const googleSignin = () => {

        googleSignupAndLogin()
            .then(result => {
                const userData = {
                    name: user.displayName,
                    email: user.email,
                    type: "Buyer"
                }
                fetch(`http://localhost:5000/addusers`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged === true) {
                            toast.success('Signin successfully!');
                            setThisLoading(false);
                            navigate('/');
                        }
                    })
            })
            .then(error => {
                console.log(error);
                setError(error.code);
                setThisLoading(false);
            })
    }
    const handleLogin = (data) => {
        setThisLoading(true);
        signIn(data.email, data.password)
            .then((result) => {
                console.log(result);
                toast.success("Login successfully!")
                setThisLoading(false);
            })
            .catch(error => {
                setError(error.code);
                setThisLoading(false);
            })
    }
    return (
        <div >
            <div className="hero min-h-screen  bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse w-[99%] mx-auto">
                    <div className="card flex-shrink-0  w-[98%] mx-auto max-w-[500px] shadow-2xl bg-base-100">
                        {
                            thisLoading ? <Loading /> : ''
                        }
                        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                            <h2 className='text-3xl text-center font-bold'>Login</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: "Email is required" })} />
                                {
                                    errors.email && <p className='text-red-500 my-1'>{errors.email.message}*</p>
                                }

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" {...register("password", {
                                    required: "Password is required", minLength: 6
                                })} />
                                {
                                    errors.password && <p className='text-red-500 my-1'>{errors.password.message}</p>
                                }
                                {errors.password && errors.password.type === "minLength" && <p className='text-red-500 my-1'>Password length atleast 6 characters.</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {
                                error && <p className='text-red-500 my-1'>{error}*</p>
                            }
                            <div className="form-control mt-6">
                                <button className="btn btn-secondary">Login</button>
                            </div>
                            <div className='mt-3'>
                                <h2>Don't have an account?<Link to='/signup' className='font-semibold ml-1'>Signup</Link></h2>
                            </div>
                            <div className='mt-3'>
                                <p onClick={googleSignin} className="btn btn-primary text-white w-full flex gap-2">
                                    <FcGoogle className='text-xl' />    <span>Continue with Google</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;