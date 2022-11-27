import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import React from 'react';
import image from '../../../assets/camera1.jpg';

const AboutUs = () => {
    return (
        <div className='mt-10 mb-32'>
            <div className=" md:h-[600px] px-5">
                <div className="w-[99%] mx-auto grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4">
                    <div className='order-2 md:order-1'>
                        <h1 className='text-primary font-bold text-xl'>ABOUT US</h1>
                        <h1 className="text-5xl font-bold ml-0 pl-0">Best Camera for your Necessary!</h1>
                        <p className="py-6">We buy DSLR and mirrorless cameras, film SLR and rangefinder cameras, lenses and accessories from all the top brands like Canon, Nikon, Sony, Fujifilm, Olympus, Panasonic, Pentax, Ricoh, Leica, Hasselblad, Rollei, Phase One, Mamiya, Sigma, Tamron, Tokina, Voigtlander, Zeiss, Minolta, Contax, Konica, Polaroid, Mint, Linhof, GoPro, and so many more.</p>
                        <button className="btn btn-primary rounded-3xl font-bold px-7">Get Started <FaArrowRight className='ml-2 text-md' /> </button>
                    </div>
                    <img src={image} className="order-1 md:order-2 md:h-[600px] w-full rounded-lg shadow-2xl" />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;