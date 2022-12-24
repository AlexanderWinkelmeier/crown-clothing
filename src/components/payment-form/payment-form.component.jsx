import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { FormContainer } from './payment-form.styles';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentButton, PaymentFormContainer } from './payment-form.styles';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    // Die Anwort (response) vom Backend
    // Der Pfad ist relativ zur root
    const response = await fetch(
      '/.netlify/functions/create-payment-intent',
      // was zum Backend geschickt wird
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 10000 }),
      }
      // was vom Backend ins Frontend zurückkommt
    ).then((res) => {
      return res.json();
    });
    console.log(response);

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Mario Muster',
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted}>
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;
