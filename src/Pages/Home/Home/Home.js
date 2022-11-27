import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems';
import Banner from '../Banner/Banner';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>            
            <ProductCategories></ProductCategories>
            <AdvertiseItems></AdvertiseItems>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;