import express from 'express';
import Stripe from 'stripe';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ===== FIXED: Use environment variable instead of hardcoded key =====
// const stripe = new Stripe('sk_test_51P2FQ2SIH2FqD1tKqgKtLx1Z5vJ8m9n7bV6cX8yA3dF4rT9wM0'); // ← Remove this
// const stripe = new Stripe(process); // ← Use this
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { amount, currency, bookingId, email } = req.body;
    
    console.log('Payment request received:', {
      amountReceived: amount,
      bookingId,
      currency,
      userId: req.user?._id
    });

    // ===== FIXED: Validate and convert amount =====
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    // Convert rupees to smallest currency unit
    // INR: rupees → paise (1 rupee = 100 paise)
    // USD: dollars → cents (1 dollar = 100 cents)
    const amountInSmallestUnit = Math.round(amount * 100);
    
    console.log(`Amount conversion: ${amount} ${currency} → ${amountInSmallestUnit} smallest units`);

    // ===== FIXED: Verify booking exists and belongs to user =====
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if booking belongs to current user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized for this booking'
      });
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit, // ← Now correctly converted
      currency: currency || 'inr',
      metadata: {
        bookingId,
        userId: req.user._id.toString(),
        bookingAmount: amount // Store original amount for reference
      },
      receipt_email: email || req.user.email,
      automatic_payment_methods: {
        enabled: true,
      },
      description: `Booking payment for ${booking.carBrand || 'car'}`, // Optional
    });

    console.log('Payment intent created:', paymentIntent.id);

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount, // Return original amount for frontend reference
      currency: currency || 'inr'
    });
    
  } catch (error) {
    console.error('Stripe create error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create payment'
    });
  }
});

// Confirm Payment
router.post('/confirm-payment', protect, async (req, res) => {
  try {
    const { paymentIntentId, bookingId } = req.body;

    console.log('Confirming payment:', { paymentIntentId, bookingId });

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    console.log('Payment intent status:', paymentIntent.status);

    if (paymentIntent.status === 'succeeded') {
      // ===== FIXED: Additional verification =====
      if (paymentIntent.metadata.bookingId !== bookingId) {
        return res.status(400).json({
          success: false,
          message: 'Payment intent does not match booking'
        });
      }

      // Update booking in database
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          status: 'confirmed',
          paymentStatus: 'paid',
          paymentId: paymentIntentId,
          paymentMethod: 'stripe',
          paidAmount: paymentIntent.amount / 100, // Convert back to rupees
          paymentDate: new Date(),
          stripeDetails: {
            paymentIntentId: paymentIntent.id,
            amountCaptured: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status
          }
        },
        { new: true }
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      res.json({
        success: true,
        message: 'Payment confirmed successfully',
        booking: {
          id: booking._id,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
          paidAmount: booking.paidAmount
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: `Payment not successful. Status: ${paymentIntent.status}`
      });
    }
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment confirmation failed'
    });
  }
});

// Webhook for real-time updates (optional - for production)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Use your webhook secret from .env
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const bookingId = paymentIntent.metadata.bookingId;
      
      console.log('Webhook: Payment succeeded for booking:', bookingId);
      
      // Update booking status in database
      try {
        await Booking.findByIdAndUpdate(bookingId, {
          status: 'confirmed',
          paymentStatus: 'paid',
          paymentId: paymentIntent.id,
          paymentMethod: 'stripe',
          paidAmount: paymentIntent.amount / 100,
          paymentDate: new Date()
        });
        console.log('Booking updated via webhook:', bookingId);
      } catch (dbError) {
        console.error('Failed to update booking via webhook:', dbError);
      }
      break;
    
    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      console.log('Webhook: Payment failed:', failedIntent.id);
      break;
    
    default:
      console.log(`Unhandled webhook event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Get payment status
router.get('/payment-status/:paymentIntentId', protect, async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.paymentIntentId);
    
    res.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        created: paymentIntent.created
      }
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;