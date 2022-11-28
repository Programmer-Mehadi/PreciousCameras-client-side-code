import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const { _id, price, customerName, customerEmail, itemId, itemName, itemImg, phoneNumber,
        location } = booking;
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error?.message);
            setCardError(error?.message);
        }
        else {
            setCardError('');
        }
        setTransactionId(null);
        setSuccess(null);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: customerName,
                    email: customerEmail
                },
            },
        })

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status == "succeeded") {

            axios.get('/confirmorder', {
                body: JSON.stringify(_id)
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });

            console.log(paymentIntent.status);
            setSuccess('Congrats! your payment completed.');
            setTransactionId(paymentIntent.id)
        }
    }

    return (
        <div className='bg-white text-black rounded w-[90%] '>
            <div className=''>
                <h2 className='font-bold text-primary text-center pt-3 px-3 text-3xl'>Product Information</h2>
                <div className='w-[98%] p-4 mx-auto '>
                    <img src={itemImg} className='md:w-[30%] mx-auto h-[200px] ' alt="" />
                    <div className="overflow-x-auto">
                        <div className=''>
                            <p className='w-fit'><span className='font-bold'>Product Name</span> : {itemName}</p>
                        </div>
                        <div className=''>
                            <p className='w-fit'><span className='font-bold'>Product Price</span> : {price}tk</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <form className='p-4 m-4 ' onSubmit={handleSubmit}>
                <span className=''><CardElement /></span>
                <button className=' mt-10 px-20 btn bg-secondary text-white' type="submit" disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </button>
                {
                    <p className='text-red-500'>{cardError}</p>
                }
                {
                    success !== null && <p className='text-green-500 my-6'>{success}</p>
                }
                {
                    transactionId && <p className='font-bold'>TransactionId : <span className='font-semibold'>{transactionId}</span></p>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;