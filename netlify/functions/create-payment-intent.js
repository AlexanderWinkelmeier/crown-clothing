require('dotenv').config();
// liest automatisch die Umgebungsvariablen von .env aus
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// stripe werden diese Umgebungsvariablen übergeben, hier: der Secret Key von Stripe

// Handler-Funktion (hier: serverless AWS-Lambda), die exportiert wird und an anderer Stelle importiert werden kann
exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body); // JSON-String --> JavaScript-Objekt

    // Bezahl-Absicht
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }), // JavaScript-Objekt --> JSON-String ans Frontend
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }), // JavaScript-Objekt --> JSON-String ans Frontend
    };
  }
};

// Anmerkungen:
// - event entspricht dem request bei express.js
// - dieses event ist also eine Anfrage, die vom Frontend kommt - das ist
// ist ein JSON-String mit einem Body, d.h. dem Inhalt, der in ein JSON-Objekt
// transformiert wird
// dieser Inhalt (body) ist hier nur der Betrag (amount), der über stripe abgewickelt
// werden soll
// aus diesem Betrag wird - zusammen mit der Währung (currency) und den Bezahlmethoden
// (payment-method-types) - eine Bezahl-Absicht an Stripe gestellt, d.h. den Stripe-Server
// Je nachdem, ob diese erfolgreich war oder nicht wird andere Content als JSON-String
// an das Frontend zurückgeschickt
// a) Erfolg: das PaymentIntent-Objekt mit einem Status-Code von 200
// b) Misserfolg: das Error-Objekt mit einem Status-Code von 400
