// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { toast } from 'react-hot-toast';
// import { useAppContext } from '../../context/AppContext';

// const StripePayment = ({ amount, bookingId, currency = 'inr', onSuccess, onCancel }) => {
//   const { axios } = useAppContext();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!stripe || !elements) {
//       toast.error('Payment system not ready');
//       return;
//     }

//     // Validate booking ID
//     if (!bookingId) {
//       toast.error('Booking ID is missing');
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log('Starting payment process for booking:', bookingId);
//       console.log('Amount:', amount, currency);

//       // 1. Create payment intent on backend - Send RUPEES, not paise
//       const { data } = await axios.post('/api/stripe/create-payment-intent', {
//         amount: amount, // ← Send rupees (e.g., 5000 for 5000 INR)
//         currency: currency,
//         bookingId: bookingId,
//         email: email || undefined // Optional
//       });

//       console.log('Payment intent created:', data.paymentIntentId);

//       if (!data.success) {
//         throw new Error(data.message || 'Failed to create payment');
//       }

//       // 2. Confirm card payment
//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             email: email || undefined,
//           },
//         },
//         // Optional: Add return_url for redirect-based flow
//         // return_url: window.location.origin + '/payment-success?booking=' + bookingId,
//       });

//       console.log('Payment result:', {
//         error: result.error,
//         status: result.paymentIntent?.status
//       });

//       if (result.error) {
//         // Handle card errors
//         if (result.error.type === 'card_error') {
//           toast.error(`Card error: ${result.error.message}`);
//         } else {
//           toast.error(`Payment failed: ${result.error.message}`);
//         }
//       } else if (result.paymentIntent.status === 'succeeded') {
//         // 3. Update booking payment status on backend
//         try {
//           await axios.post('/api/stripe/confirm-payment', {
//             paymentIntentId: result.paymentIntent.id,
//             bookingId: bookingId
//           });
          
//           toast.success('Payment successful! Booking confirmed.');
//           onSuccess(result.paymentIntent);
//         } catch (updateError) {
//           console.error('Failed to update booking:', updateError);
//           // Payment succeeded but booking update failed
//           toast.success('Payment succeeded! Contact support for booking confirmation.');
//         }
//       } else {
//         // Handle other statuses
//         toast.warning(`Payment status: ${result.paymentIntent.status}`);
//       }
//     } catch (error) {
//       console.error('Payment process error:', {
//         message: error.message,
//         response: error.response?.data,
//         endpoint: error.config?.url
//       });
      
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else if (error.message) {
//         toast.error(error.message);
//       } else {
//         toast.error('Payment failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//       <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Payment</h3>
//       <p className="text-gray-600 mb-1">Booking ID: <span className="font-mono text-sm">{bookingId?.substring(0, 12)}...</span></p>
//       <p className="text-gray-600 mb-6">
//         Total Amount: <span className="font-bold text-green-600 text-xl">
//           {currency === 'inr' ? '₹' : '$'}{amount}
//         </span>
//       </p>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email for receipt (optional)
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Card Details
//           </label>
//           <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
//             <CardElement 
//               options={{
//                 style: {
//                   base: {
//                     fontSize: '16px',
//                     color: '#424770',
//                     '::placeholder': {
//                       color: '#aab7c4',
//                     },
//                   },
//                 },
//                 hidePostalCode: true,
//               }}
//             />
//           </div>
//           <div className="mt-2 text-xs text-gray-500 bg-yellow-50 p-2 rounded">
//             <p className="font-medium">Test Card (No real money charged):</p>
//             <p>Card: <span className="font-mono">4242 4242 4242 4242</span></p>
//             <p>Expiry: Any future date (e.g., 12/34)</p>
//             <p>CVC: Any 3 digits (e.g., 123)</p>
//           </div>
//         </div>

//         <div className="flex gap-3 pt-4">
//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={loading}
//             className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={!stripe || loading || !bookingId}
//             className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
//               !stripe || loading || !bookingId
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Processing...
//               </span>
//             ) : `Pay ${currency === 'inr' ? '₹' : '$'}${amount}`}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default StripePayment;
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const StripePayment = ({ amount, bookingId, currency = 'inr', onSuccess, onCancel }) => {
  const { axios } = useAppContext();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("=== PAYMENT START ===");
    console.log("Stripe loaded:", !!stripe);
    console.log("Elements loaded:", !!elements);
    console.log("Amount:", amount);
    console.log("Booking ID:", bookingId);
    
    if (!stripe || !elements) {
      toast.error('Payment system not ready');
      return;
    }

    if (!bookingId) {
      toast.error('Invalid booking ID');
      return;
    }

    setLoading(true);

    try {
      // 1. Create payment intent on backend
      console.log("Creating payment intent...");
      const { data } = await axios.post('/api/stripe/create-payment-intent', {
        amount: amount, // Send rupees (not paise)
        currency: currency,
        bookingId,
        email: email || undefined
      });

      console.log("Payment intent response:", data);

      if (!data.success) {
        throw new Error(data.message || 'Failed to create payment');
      }

      // 2. Get card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // 3. Confirm card payment
      console.log("Confirming payment with client secret...");
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: email || undefined,
          },
        },
      });

      console.log("Stripe payment result:", result);

      if (result.error) {
        // Handle specific test card errors
        if (result.error.code === 'card_declined') {
          toast.error('Test card declined. Use 4242 4242 4242 4242');
        } else if (result.error.code === 'incorrect_number') {
          toast.error('Invalid card number. Use 4242 4242 4242 4242');
        } else {
          toast.error(`Payment failed: ${result.error.message}`);
        }
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log("Payment succeeded! Updating booking...");
        
        // 4. Update booking status
        try {
          await axios.post('/api/stripe/confirm-payment', {
            paymentIntentId: result.paymentIntent.id,
            bookingId
          });
          
          toast.success('Payment successful! Booking confirmed.');
          onSuccess(result.paymentIntent);
        } catch (updateError) {
          console.error('Failed to update booking:', updateError);
          // Payment succeeded but booking update failed
          toast.success('Payment succeeded! Contact support for booking confirmation.');
        }
      } else {
        toast.warning(`Payment status: ${result.paymentIntent.status}`);
      }
    } catch (error) {
      console.error('Payment process error:', error);
      
      // Detailed error logging
      if (error.response) {
        console.error('Response error:', {
          status: error.response.status,
          data: error.response.data,
          endpoint: error.config?.url
        });
        toast.error(error.response.data?.message || 'Payment failed');
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from payment server');
      } else {
        console.error('Request error:', error.message);
        toast.error(error.message || 'Payment failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle card completion
  const handleCardChange = (event) => {
    setCardComplete(event.complete);
  };

  // Auto-fill test card (for testing only)
  const fillTestCard = () => {
    setEmail('test@example.com');
    toast.info('Test card info loaded. Card: 4242 4242 4242 4242');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Payment</h3>
      <p className="text-gray-600 mb-1">Booking ID: <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{bookingId?.substring(0, 10)}...</span></p>
      <p className="text-gray-600 mb-6">
        Total Amount: <span className="font-bold text-green-600 text-xl">
          {currency === 'inr' ? '₹' : '$'}{amount}
        </span>
      </p>
      
      {/* Test button (remove in production) */}
      <button
        type="button"
        onClick={fillTestCard}
        className="mb-4 w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
      >
        📋 Load Test Card Info
      </button>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email for receipt (optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Details
          </label>
          <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
                hidePostalCode: true,
              }}
              onChange={handleCardChange}
            />
          </div>
          
          {/* Test card instructions */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-800 mb-1">💳 Test Card Information:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><span className="font-mono">4242 4242 4242 4242</span></p>
              <p>Expiry: Any future date (e.g., 12/34)</p>
              <p>CVC: Any 3 digits (e.g., 123)</p>
              <p className="text-xs italic mt-2">No real money will be charged</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || loading || !cardComplete}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              !stripe || loading || !cardComplete
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : `Pay ${currency === 'inr' ? '₹' : '$'}${amount}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripePayment;