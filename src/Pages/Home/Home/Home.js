import React from 'react';
import ProductCategories from '../ProductCategories/ProductCategories';
import Slider from '../Slider/Slider';

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            <Slider></Slider>
            <ProductCategories></ProductCategories>
        </div>
    );
};

export default Home;