import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${process.env.REACT_APP_stripe_pk}`);

const Payment = () => {
    const data = useLoaderData();
    return (
        <div className='flex items-center justify-center my-auto py-6'>
            <Elements stripe={stripePromise}>
                <CheckoutForm booking={data} />
            </Elements>
        </div>
    );
};

export default Payment;