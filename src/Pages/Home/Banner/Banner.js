import React from 'react';
import { FaArrowAltCircleRight } from "@react-icons/all-files/fa/FaArrowAltCircleRight";

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url("/banner.jpg")` }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-5xl font-bold text-primary">Inspire, Explore, Create & Showcase.</h1>
                    <p className="mb-5">Turn your old gear into new possibilities. Sell Your Used Camera Gear, Lenses And Accessories At Prices You Can Feel Good About.</p>
                    <button className="btn btn-primary rounded-3xl">Order Now <FaArrowAltCircleRight className='ml-2 text-xl'/> </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;