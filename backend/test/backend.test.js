const crypto = require('crypto');

// Expect token to be a hex HMAC of payload using secret in PAYMENT_SECRET
module.exports = function verifyPayment(token, payload) {
  // Use PAYMENT_SECRET with fallback
  const secret = process.env.PAYMENT_SECRET || 'dev-secret';

  const h = crypto.createHmac('sha256', secret)
    .update(payload)
    .digest('base64');

  return token === h;
};