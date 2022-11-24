import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/404.jpg';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <img src={image} alt="" />
            <div>
                <Link className='btn text-white' to='/'>Go To Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;