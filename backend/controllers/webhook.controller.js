import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
    console.log("Hi")
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('💰 PaymentIntent was successful:', paymentIntent);
            break;

        case 'payment_intent.payment_failed':
            const failedIntent = event.data.object;
            console.log('❌ Payment failed:', failedIntent);
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send({ received: true });
};


// [System.Environment]::GetEnvironmentVariable('Path', 'Machine')
// $newPath = "C:\Users\USER\Downloads\stripe_1.18.0_windows_x86_64"
// [System.Environment]::SetEnvironmentVariable('Path', $path + ';' + $newPath, 'Machine')