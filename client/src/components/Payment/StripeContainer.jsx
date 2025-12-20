import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePayment from './StripePayment';

// Use TEST key - get from https://dashboard.stripe.com/test/apikeys
const stripePromise = loadStripe('pk_test_51Sfy7TIxDf1THFWBTNbKzGkOurZbeSWP9fo7xPoWnJk1xoA3mvse0ReXTohBQCtgsfABqwozmspi5FTenkI8rtro00e8D5dots');

const StripeContainer = ({ amount, bookingId, currency = 'inr', onSuccess, onCancel }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripePayment
        amount={amount}
        bookingId={bookingId}
        currency={currency}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
};

export default StripeContainer;