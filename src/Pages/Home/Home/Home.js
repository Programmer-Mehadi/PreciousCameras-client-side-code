import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import Banner from '../Banner/Banner';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>            
            <ProductCategories></ProductCategories>
            
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;